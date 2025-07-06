import "./Main.css";
import { specialities } from "../Specailities";
import { Link } from "react-router-dom";
import Img from "../assets/images/right.png";
// import { useState } from "react";

const Main = () => {
  return (
    <>
      <div id="home" className="main-container">
        <div className="sec-container">
          <div className="text-content">
            <h1>Doctor Recommendation System</h1>
            <p>Best Recommendation of various specaility in Your City</p>
            <a href="#specialties">
              <button>See Specialties</button>
            </a>
          </div>
        </div>
      </div>
      <div className="box-container">
        <div className="box">
          <div className="text-box">
            <h2>Why Choose Our Recommendations?</h2>
            <div className="features">
              <div className="feature">
                <h3>Comprehensive, Multidisciplinary Care</h3>
                <p>
                  Various specialties including Neurology, Cardiology, and more.
                </p>
              </div>
              <div className="feature">
                <h3>Personalized & Accurate Suggestions</h3>
                <p>
                  AI-based analysis of patient needs and doctor qualifications.
                </p>
              </div>
              <div className="feature">
                <h3>No Extra Fees</h3>
                <p>We help you find the right doctor without extra cost.</p>
              </div>
              <div className="feature">
                <h3>Trusted Doctors</h3>
                <p>
                  Professionals with verified credentials and patient feedback.
                </p>
              </div>
            </div>
            <a href="#specialties">
              <button className="cta-btn">See Specialties</button>
            </a>
          </div>
          <div className="img-box">
            <img src={Img} alt="Doctor Consultation" />
          </div>
        </div>
      </div>
      <div id="specialties" className="card-container">
        <h1>Specialties We Recommend</h1>
        <div className="cards">
          {specialities.map((items) => (
            <div
              className="card"
              style={{
                boxShadow: `5px 5px 0 ${items.shadowColor}`,
                border: `3px solid ${items.shadowColor}`,
              }}
            >
              <div className="card-text">
                <div className="box-img">
                  <div
                    className="img-circle"
                    style={{
                      backgroundColor: items.shadowColor,
                    }}
                  >
                    <img src={items.img} alt={`${items.spec} icon`} />
                  </div>
                </div>
                <h3>{items.spec}</h3>
                <p>{items.text}</p>
                <Link to={items.pageLink}>
                  <button>See Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
