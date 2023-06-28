import React from "react";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";

import logo from "../assets/laf_logo.png";

export default function Footer() {
  return (
    <MDBFooter className="footer text-white text-center text-md-start">
      <MDBContainer className=" p-4">
        <div className="footer-container">
          <img src={logo} alt="" className="footer-logo" />

          <div className="footer-links">
            <div className="footer-link">Contact Us</div>
            <div className="footer-link">Report A Bug</div>
            <div className="footer-link">Feedback</div>
          </div>
        </div>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          Lost & Found
        </a>
      </div>
    </MDBFooter>
  );
}
