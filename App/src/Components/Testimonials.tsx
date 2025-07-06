import { useEffect, useState } from "react";
import "./Testimonials.css";

interface Testimonial {
  id: number;
  user: string;
  message: string;
  doctor: string;
  rating: number;
}


const Testimonials = () => {
    const [testimonials , setTestimonials] = useState<Testimonial[]>([]);

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/feedback_Data', {
            method:'GET',
            headers: {
        "Content-Type": "application/json",
      },
        })
        .then((res) =>{
            if(!res.ok) throw new Error('Failed to Fetch Testimoinals')
            return res.json();
        })
        .then((data)=>{
            setTestimonials(data) 
        })
        .catch((err) =>{
            console.log('Error in Fetching data', err)
        });
    }, [])

  return (
    <div className="testimonials-container">
    
      <h1 className="testimonials-title">What Our Patients Say</h1>
      <div className="testimonials-list">
        {testimonials.map((t , idx) => (
          <div key={idx} className="testimonial-card">
            <h3>{t.user}</h3>
            <p className="testimonial-message">"{t.message}"</p>
            <p className="testimonial-doctor">Consulted: <strong>{t.doctor}</strong></p>
            <div className="testimonial-rating">
              {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
