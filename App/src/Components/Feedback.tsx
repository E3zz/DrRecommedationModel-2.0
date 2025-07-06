import "./FeedBack.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/store.ts";

interface Appointment {
  dr_name: string;
  time: string;
  fees: string;
}

const Feedback = () => {
  const name = useSelector((state: RootState) => state.user.name);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Appointment | null>(null);
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    if (!name) return;

    fetch("http://127.0.0.1:5000/getappt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [name]);

  const handleFeedback = (doctor: Appointment) => {
    setSelectedDoctor(doctor);
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setRating("");
    setMessage("");
    setFeedbackMessage("");
    setSelectedDoctor(null);
  };

  const submitFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      dr_name: selectedDoctor?.dr_name,
      user: name,
      rating,
      message,
    };

    fetch("http://127.0.0.1:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          setFeedbackMessage("Feedback submitted successfully!");
          setTimeout(() => closeOverlay(), 2000);
        } else {
          setFeedbackMessage("Failed to submit feedback.");
        }
      })
      .catch(() => {
        setFeedbackMessage("Something went wrong.");
      });
  };

  return (
    <>
      <div className="fb-container">
        <div className="fb-main">
          <h1>Your Past Appointments</h1>
          {appointments.length === 0 ? (
            <p>No past appointments found.</p>
          ) : (
            <ul className="fb-list">
              {appointments.map((appt, idx) => (
                <li key={idx} className="fb-item">
                  <div>
                    <h3>{appt.dr_name}</h3>
                    <p>Time: {appt.time}</p>
                    <p>Fee: {appt.fees}</p>
                  </div>
                  <button
                    className="fb-button"
                    onClick={() => handleFeedback(appt)}
                  >
                    Give Feedback
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showOverlay && selectedDoctor && (
        <div className="booking-overlay">
          <div className="booking-card">
            <button className="close-btn" onClick={closeOverlay}>
              ×
            </button>
            <h2>Feedback for {selectedDoctor.dr_name}</h2>
            <form className="booking-form" onSubmit={submitFeedback}>
              <label>
                Rating (1–5):
                <input
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </label>
              <label>
                Message:
                <textarea
                  placeholder="Write your feedback..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
              <button type="submit" className="submit-booking">
                Submit Feedback
              </button>
              {feedbackMessage && (
                <p className="booking-message">{feedbackMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
