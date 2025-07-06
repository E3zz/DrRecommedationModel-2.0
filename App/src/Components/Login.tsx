import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/user/UserSlice";

const Login = () => {
  const [action, SetAction] = useState("Login");
  const [isLogin, setisLogin] = useState(true);
  const [, setisSignUp] = useState(false);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSwitch = (mode: "Login" | "SignUp") => {
    SetAction(mode);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        if (action === "Login") {
          const loginPayload = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
          };
          fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginPayload),
          })
            .then((res) => res.json().then(data => ({ ok: res.ok, data })))
            .then(({ ok, data }) => {
              if (ok) {
                setisLogin(true);
                dispatch(login(data.name)); // ✅ dispatch user name to Redux
                navigation("/");
              } else {
                setisLogin(false);
              }
            });
        } else {
          const signUpPayload = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
          };
          fetch("http://127.0.0.1:5000/signUp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signUpPayload),
          }).then((res) => {
            if (res.ok) {
              setisSignUp(true);
              navigation("/login");
            } else {
              setisSignUp(false);
            }
          });
        }
      }}
    >
      <div className="login-container">
        <div className="login-main">
          <div className="login-box">
            {!isLogin ? <h4>Invalid Login</h4> : null}
            <div className="login-btns-box">
              <button
                type="button"
                onClick={() => handleSwitch("Login")}
                className={`login-btn ${action === "Login" ? "active" : ""}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleSwitch("SignUp")}
                className={`login-btn ${action === "Sign Up" ? "active" : ""}`}
              >
                Sign Up
              </button>
            </div>
            <div className="ip-fields">
              <input
                className={action === "Login" ? "login-hide" : ""}
                name="name"
                type="text"
                placeholder="Name"
              />
              <input name="email" type="email" placeholder="Email" required />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="login-btn-last">
              Log In
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
