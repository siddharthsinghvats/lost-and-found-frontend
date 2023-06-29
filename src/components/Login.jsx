import { React, useContext, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import LoginImg from "../assets/login.png";
import logo from "../assets/laf_logo.png";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Loading from "./Loading";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(BACKEND_URL+"/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setLoading(false);
        // navigate("/lost");

        const user = await response.json();
        console.log("Login successful");
        localStorage.setItem("user", JSON.stringify(user.user));
        window.location.reload();
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MDBContainer  className="login-container  ">
          <MDBRow className="login">
            <MDBCol col="10" md="5" className="login-animation">
              <lottie-player
                src="https://assets3.lottiefiles.com/packages/lf20_ntdmh9RIUC.json"
                background="transparent"
                speed="1"
                loop
                style={{width:"80%"}}
                autoplay
              ></lottie-player>
            </MDBCol>

            <MDBCol col="4" md="6" className="login-form">
              <Link to="/">
                {" "}
                <img src={logo} alt="sign in logo" />
              </Link>
              <MDBInput
              style={{color:"white"}}
                wrapperClass="mb-4"
                label="Email"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
               style={{color:"white"}}
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="forgot-pass mx-4 mb-4">
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn
                style={{ backgroundColor: "#2E8A99", boxShadow: "none" }}
                className="auth-btn mb-4 w-50"
                size="lg"
                onClick={(e) => handleSubmit(e)}
              >
                Sign in
              </MDBBtn>
              <div className="d-flex" style={{color:"white"}}>
                New here? &nbsp;{" "}
                <Link to="/signup" style={{ color: "#2E8A99" }}>
                  {" "}
                  Sign up here{" "}
                </Link>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </>
  );
}

export default Login;
