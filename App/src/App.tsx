import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Main from "./Components/Main";
import Gynecologist from "./Components/Gynecologist";
import Ent from "./Components/Ent";
import Dermatologist from "./Components/Dermatologist";
import Eye from "./Components/Eye";
import Diabetologist from "./Components/Diabetologist";
import Orthopedic from "./Components/Orthopedic";
import Pediatrician from "./Components/Pediatrician";
import About from "./Components/About";
import ScrollTop from "./Components/ScrollTop";
import Login from "./Components/Login";
import Feedback from "./Components/Feedback";
import Testimonials from "./Components/Testimonials";
import { useDispatch } from "react-redux";
import { login } from "./Store/user/UserSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const name = localStorage.getItem("name");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (name && isLoggedIn === "true") {
      dispatch(login(name));
    }
  }, [dispatch]);
  return (
    <>
      <ScrollTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/About" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/Testimonials" element={<Testimonials />} />
        <Route path="/Gynecologist" element={<Gynecologist />} />
        <Route path="/ENT" element={<Ent />} />
        <Route path="/Dermatologist" element={<Dermatologist />} />
        <Route path="/Eye" element={<Eye />} />
        <Route path="/Diabetologist" element={<Diabetologist />} />
        <Route path="/Orthopedic" element={<Orthopedic />} />
        <Route path="/Pediatrician" element={<Pediatrician />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
