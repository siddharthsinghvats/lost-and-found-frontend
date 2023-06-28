import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import logo from "../assets/laf_logo.png";
import lost from "../assets/lost.svg";
import found from "../assets/found.svg";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <>
      {/* <div className="landing"> */}
      {/* <MDBContainer className="p-5 landing-nav">
          <MDBRow className="mb-3">
            <MDBCol size="12" className="landing-logo col-md-6">
              <img src={logo} alt="" />
            </MDBCol>
            <MDBCol size="12" className="landing-btns col-md-6">
              <Link to="/signup">
                {" "}
                <MDBBtn rounded className="text-dark" color="light">
                  Sign Up
                </MDBBtn>
              </Link>
              <Link to="/login">
                <MDBBtn rounded className="mx-2" color="dark">
                  Login
                </MDBBtn>
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="welcome">
          <div className="landing-side-img">
            <img src={lost} alt="" />
            <img src={found} alt="" />
          </div>
          <div className="landing-card">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle style={{ color: "#F9F5F6" }}>
                  Welcome
                </MDBCardTitle>
                <MDBCardText>
                  No need to spam mails in case you lost an item in the campus.
                  Get started to post a lost item or to report a found item in
                  the campus, all at one place.
                </MDBCardText>
                <Link to="/signup">
                  <MDBBtn
                    style={{
                      backgroundColor: "#2E8A99",
                      color: "white",
                      boxShadow: "none",
                    }}
                  >
                    Get Started
                  </MDBBtn>
                </Link>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      </div> */}
      <div className="landing">
        <div className="landing-animation">
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_s3PG4r.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
       <div className="landing-right"> 
       <div className="landing-nav">
          <img src={logo} alt="" className="landing-logo" />
          <div className="landing-btns">
            <Link to={"/signup"}>
              <MDBBtn rounded style={{ backgroundColor: "#4ca7b5" }}>
                Sign Up
              </MDBBtn>
            </Link>
            <Link to={"/login"}>
              <MDBBtn rounded style={{ backgroundColor: "#068a8f" }}>
                Login
              </MDBBtn>
            </Link>
          </div>
        </div>
        <div className="landing-text">
          <h1>
            Find What's Lost,
            <br /> Rediscover Possibilities
          </h1>
          Introducing IIIT Lucknow's Lost and Found App, the ultimate solution
          to reunite you with your belongings. From misplaced textbooks to
          forgotten gadgets, our app connects students and staff in a seamless
          search for lost items.
          <Link to={"/login"}>
            <MDBBtn
              style={{
                display: "block",
                backgroundColor: "#06868f",
                color: "white",
                boxShadow: "none",
                marginTop: "3rem",
                fontSize: "1.3rem",
                borderRadius: "10px",
              }}
            >
              Get Started
            </MDBBtn>
          </Link>
        </div>
        </div>
      </div>
      
    </>
  );
};
export default Landing;
