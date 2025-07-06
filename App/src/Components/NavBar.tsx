import "./NavBar.css";
import Logo from "../assets/images/logo2.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/store";

const NavBar = () => {
  const name = useSelector((state: RootState) => state.user.name);
  const isLoggIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <>
      <header>
        <div className="nav">
          <div className="logo">
            <img className="img" height={90} src={Logo} alt="Logo" />
            <Link to={"/"}>
              <span>Dr Recommender</span>
            </Link>
          </div>
          <ul className="links">
            <li className="l1"><Link to="/">Home</Link></li>
            <li className="l1"><Link to="/About">About Us</Link></li>
            <li className="l1"><a href="#specialties">Specialities</a></li>
            <li className="l1"><Link to="/Testimonials">Testimonials</Link></li>
            <li className="l1"><Link to="/FeedBack">FeedBack</Link></li>
            <li className="l1">
              <Link to="/login">
                {isLoggIn ? `Welcome, ${name}` : "Login"}
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default NavBar;
