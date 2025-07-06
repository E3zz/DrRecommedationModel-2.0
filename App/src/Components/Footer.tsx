import "./Footer.css";
import logo from "../assets/images/logo2.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-logo-section">
        <div className="logo-name">
          <img src={logo} alt="App Logo" className="footer-logo" />
          <h2 className="footer-title">DR Recommender</h2>
        </div>
        <p className="footer-description">
          Empowering your health journey through AI-driven doctor
          recommendations and verified care.
        </p>
      </div>

      <div className="footer-links">
        <h4>Explore</h4>
        <ul>
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/About"}>
            <li>About</li>
          </Link>
          <li>
            <a href="/team">Our Team</a>
          </li>
        </ul>
      </div>

      <div className="footer-links">
        <h4>Services</h4>
        <ul>
          <Link to={"/Gynecologist"}>
            <li>Gynecologist</li>
          </Link>
          <Link to={"/Eye"}>
            <li>Eye Specailist</li>
          </Link>
          <Link to={"/Ent"}>
            <li>ENT</li>
          </Link>
        </ul>
      </div>
       <div className="footer-links">
        <ul>
          <Link to={"/Dematologist"}>
            <li>Dematologist</li>
          </Link>
          <Link to={"/Diabetologist"}>
            <li>Diabetologist</li>
          </Link>
          <Link to={"/Orthopedic"}>
            <li>Orthopedic</li>
          </Link>
          <Link to={"/Pediatrician"}>
            <li>Pediatrician</li>
          </Link>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
