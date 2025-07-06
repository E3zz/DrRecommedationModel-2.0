import "./About.css";
import ai from "../assets/about/ai.webp";
import team from "../assets/about/team.webp";
import goals from "../assets/about/goals.webp";

const About = () => {
  return (
    <>
      <div className="about-container">
        <h1 className="about-heading">Here's Something About Us</h1>
        <div className="about-main">
          <div className="about-text">
            <h2>About Our Model</h2>
            <p>
              Our intelligent recommendation system leverages AI and real-time
              data to suggest highly qualified doctors based on your specific
              medical needs, location, and satisfaction ratings. We aim to make
              healthcare access more efficient, accurate, and trustworthy.
            </p>
          </div>
          <div className="about-img">
            <img src={ai} alt="AI Model Illustration" />
          </div>
        </div>
        <div className="about-main">
          <div className="about-text">
            <h2>About Our Team</h2>
            <p>
              We are a passionate team of healthcare professionals, data
              scientists, and software engineers united by a common mission: to
              improve the way people find and trust medical care. With expertise
              in machine learning, user-centered design, and clinical insights,
              we collaborate to ensure that every recommendation we provide is
              both intelligent and deeply human-centric.
            </p>
          </div>
          <div className="about-img">
            <img src={team} alt="AI Model Illustration" />
          </div>
        </div>
        <div className="about-main">
          <div className="about-text">
            <h2>Our Goals</h2>
            <p>
              Our goal is to empower patients to make confident healthcare
              decisions. By combining real patient feedback, verified
              credentials, and smart analytics, we aim to offer reliable doctor
              recommendations that prioritize quality, trust, and accessibility.
              We envision a future where everyone can find the right care —
              quickly, transparently, and without hassle.
            </p>
          </div>
          <div className="about-img">
            <img src={goals} alt="AI Model Illustration" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
