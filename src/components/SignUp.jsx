import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";

import { BsUpload } from "react-icons/bs";
import logo from "../assets/laf_logo.png";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function Signup() {
  const [loading, setLoading] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [file, setFile] = useState('');
  const [uploadName,setUploadName] = useState('Upload Your Profile Image')
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append('name',name);
    data.append('email',email);
    data.append('password',password);
    data.append('contactNumber',contactNumber);
    data.append('profileImg',file);
    try {
      const response = await fetch(BACKEND_URL+'/auth/signup', {
        method: 'POST',
        body: data
      });
      const user = await response.json();
      if (response.ok) {
        setLoading(false);
        localStorage.setItem('user',user.user)
        console.log(response);
        navigate('/lost');
        // window.location.reload();

      } else {
        console.error('Form data submission failed');
      }
    } catch (error) {
      console.error('An error occurred while submitting the form data:', error);
    }
  }
  return (
    <>
    {
      loading?<Loading/>:
    <MDBContainer fluid className=" overflow-hidden signup-container"  style={{padding:"4rem 2rem"}}>
      <MDBRow className="signup">
        <MDBCol
          className="signup-text"
        >
          <h1
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: "#D0F5BE" }}
          >
            Discover <br />
            <span style={{ color: "#FBFFDC" }}>
           Lost & Found 
            </span>
          </h1>

          <p className="px-3" style={{color:"white",textAlign:"left", fontSize:"medium" , lineHeight:"1.5"}}>
            Find lost items with ease by signing up today. Our user-friendly
            interface connects you with a helpful community ready to assist.
            Share details, upload pictures, and increase the chances of a
            successful recovery. Help others by reporting found items. Privacy
            and security are our top priorities. Join now and never lose
            something on campus for long!
          </p>
        </MDBCol>

        <MDBCol  className=" signup-form">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-2 bg-glass inside-signup ">
            <MDBCardBody >
              <div className="signup-logo">
                <Link to='/'><img src={logo} alt="logo" /></Link>
              </div>

              <MDBInput
                wrapperClass="mb-4"
                label="Name"
                id="form1"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form2"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Phone"
                id="form3"
                type="text"
                value={contactNumber}
                onChange={(e)=>setContactNumber(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <div className="signup-img-input">
                <label htmlFor="form5" style={{ cursor: "pointer" }}>
                  <BsUpload /> &nbsp;&nbsp; {uploadName}
                </label>
                <input
                  id="form5"
                  style={{ visibility: "hidden", width: "0px" }}
                  type="file"
                  onChange={(e)=>{setUploadName(e.target.files[0].name);setFile(e.target.files[0])}}
                />
              </div>

              <MDBBtn onClick ={(e)=>{handleSubmit(e)}}style={{backgroundColor:"#2E8A99",boxShadow:"none"}} className=" ayth-btn w-50 mb-4" size="md">
                sign up
              </MDBBtn>
              <div className="d-flex" style={{color:"white "}}>
              Already a user? &nbsp; <Link to='/login' style={{display:"inline",color:"#2E8A99"}}>Login here.</Link> 
              </div>
             
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    }
    </>
  );
}

export default Signup;
