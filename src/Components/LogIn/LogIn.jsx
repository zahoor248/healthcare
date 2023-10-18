import React, { useState } from "react";
import "./LogIn.css";
import LogoImage from "../../assets/images/logo-image.png";
import TextField from "@mui/material/TextField";
import { MdAlternateEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import GoogleIcon from "../../assets/images/google-icon.png";
import Slide2 from "../../assets/images/slide2.png";
import { POST } from "../../Api/Post";
import { LOGIN } from "../../Api/EndPoints";
import { setUser } from "../../Store/Actions/Actions";

import { useDispatch } from "react-redux";


// import { GoogleLogin } from "react-google-login";
import { handleAPIRequest } from "../../helper/ApiHandler";
// import { Alert } from "react-bootstrap";

export default function LogIn() {
//   const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("webbus@yopmail.com");
  const [password, setPassword] = useState("Faraz@123");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const loginHandler = () => {
    if (email.length && !emailError && password.length) {
      setLoading(true);
      handleAPIRequest("post", "login", { email: email, password: password })
        .then((response) => {
          if (response) {
            console.log(response);

            if (response === "invalid") {
              // showMessage({
              //   message: 'Alert',
              //   description: response,
              //   type: 'danger',
              // });
              alert("Error");
              setLoading(false);
              return;
            }

            dispatch(setUser(response.user));

            localStorage.setItem("User", JSON.stringify(response.user));

            // AsyncStorage.setItem('User', JSON.stringify(response.user));
            setLoading(false);
          }
        })
        .catch((e) => {
          console.warn(e);
          // showMessage({
          //   message: "Alert",
          //   description: "something went wrong",
          //   type: "danger",
          // });
          setLoading(false);
        });
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img src={Slide2} />
      </div>

      <div className="login-credentials-section">
        <div className="logo-container">
          <img src={LogoImage} alt="healthcare logo image" />
        </div>

        <div className="login-hello-text">
          <h1>Hello Again!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit.{" "}
          </p>
        </div>

        <div>
          <div style={{ marginTop: "4rem", position: "relative" }}>
            <TextField
              className="email-text-field"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdAlternateEmail className="email-icon" />
          </div>

          <div style={{ marginTop: "2rem", position: "relative" }}>
            <TextField
              className="email-text-field"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BiLock className="email-icon" />
          </div>
        </div>

        <div className="remember-box">
          <div style={{ display: "flex" }}>
            <input className="remember-checkbox" type="checkbox" />
            <p className="remember">Remember Me</p>
          </div>
          <div>
            <p className="recovery-text">Recovery Password</p>
          </div>
        </div>

        <div className="login-btns">
          <button
            className="login-btn"
            onClick={() => {
              loginHandler();
            }}
          >
            Login
          </button>

          {/* <GoogleLogin
            clientId="434301795138-h0tqvj6l17t1a6kbi4gc0kh343r1980d.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button className="signin-btn" onClick={renderProps.onClick}>
                <img src={GoogleIcon} alt="Google Logo" />
                Sign in with Google
              </button>
            )}
          /> */}
        </div>

        <div className="footer-text">
          <p>
            Don't have an account yet?{" "}
            <span className="signup-text">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
