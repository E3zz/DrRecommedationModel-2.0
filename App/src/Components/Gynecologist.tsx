import "./Gynecologist.css";
import { useState } from "react";

type Drdata = {
  Doctor_Name: string;
  Degree: string;
  Specialty: string;
  Waiting: string;
  Experience: number;
  Fees: number;
  Hospital_Name: string;
  Number_Of_Patients: number;
  Satisfaction_level: number;
};

const Gynecologist = () => {
  const [data, setData] = useState<Drdata[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<{
    name: string;
    fee: string;
  } | null>(null);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/Gynecologist")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);

        setTimeout(() => {
          document
            .getElementById("first-recommendation")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      })
      .catch((error) => {
        console.error("Cannot obtain data", error);
        setLoading(false);
      });
  };

  const handleBooking = (doctorName: string, fee: string) => {
    setSelectedDoctor({ name: doctorName, fee });
    setShowBooking(true);
    setBookingMessage(null);
  };

  const closeBooking = () => {
    setSelectedDoctor(null);
    setShowBooking(false);
    setBookingMessage(null);
  };

  return (
    <>
      <div className="recommendation-container-gyn">
        <div className="secondary-gyn">
          <h1>
            Compassionate and expert gynecologists for women’s health at every
            stage.
          </h1>
          <button onClick={fetchData} className="btn">
            See Recommendation
          </button>
        </div>
      </div>

      {loading && <div className="loader"></div>}

      {data.map((item, idx) => (
        <div
          className="main-recommendation"
          key={idx}
          id={idx === 0 ? "first-recommendation" : undefined}
        >
          <div className="sec-con">
            {/* Doctor Info */}
            <div className="info">
              <div className="dr-info">
                <div className="dr-n">
                  <h3>{item.Doctor_Name}</h3>
                  <p>
                    <strong>{item.Degree}</strong>
                  </p>
                  <p>
                    Hospital Name: <strong>{item.Hospital_Name}</strong>
                  </p>
                </div>

                <div className="stats-row">
                  <div className="stat">
                    <span className="label">Wait:</span>
                    <span className="value">{item.Waiting}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Experience:</span>
                    <span className="value">
                      <strong>{item.Experience}</strong>
                    </span>
                  </div>
                  <div className="stat">
                    <span className="label">Rating:</span>
                    <span className="value">
                      <strong>{`${item.Satisfaction_level} %`}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Bio */}
            <div className="bio">
              <h4>{`Here’s something about ${item.Doctor_Name}`}</h4>
              <p>
                {`${item.Doctor_Name} is a passionate and highly qualified gynecologist with over `}
                <strong>{item.Experience}</strong>
                {` years of experience in women’s health and reproductive care. They have successfully treated over `}
                <strong>{item.Number_Of_Patients}</strong>
                {` patients and consistently maintained a `}
                <strong>{item.Satisfaction_level}%</strong>
                {` satisfaction rating. ${item.Doctor_Name} specializes in prenatal care, fertility counseling, and minimally invasive procedures.`}
              </p>
            </div>

            {/* Booking Area */}
            <div className="book">
              <div className="fee-box">
                Fee: <strong>Rs. {item.Fees}</strong>
              </div>
              <button
                className="book-btn"
                onClick={() =>
                  handleBooking(item.Doctor_Name, item.Fees.toString())
                }
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      ))}

      {showBooking && (
        <div className="booking-overlay">
          <div className="booking-card">
            <button className="close-btn" onClick={closeBooking}>
              ×
            </button>
            <h2>Book Appointment</h2>
            <p>
              You're booking an appointment with{" "}
              <strong>{selectedDoctor?.name}</strong> for a fee of{" "}
              <strong>Rs. {selectedDoctor?.fee}</strong>.
            </p>
            <form
              className="booking-form"
              onSubmit={(e) => {
                e.preventDefault();

                const form = e.currentTarget;
                const formData = new FormData(form);

                const payload = {
                  doctor: selectedDoctor?.name,
                  fees: selectedDoctor?.fee,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  phone: formData.get("phone") as string,
                  time: formData.get("time") as string,
                };

                fetch("http://127.0.0.1:5000/book", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                })
                  .then((res) => {
                    if (res.ok) {
                      setBookingMessage("Booking successful!");
                      setTimeout(() => closeBooking(), 2000);
                    } else {
                      setBookingMessage("Booking failed.");
                    }
                  })
                  .catch(() => {
                    setBookingMessage("An error occurred.");
                  });
              }}
            >
              <input name="name" type="text" placeholder="Your Name" required />
              <input name="email" type="email" placeholder="Email" required />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
              />

              <select name="time" required>
                <option value="" disabled selected>
                  Select Time
                </option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
              <button type="submit" className="submit-booking">
                Confirm Booking
              </button>
              {bookingMessage && (
                <p className="booking-message">{bookingMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Gynecologist;
