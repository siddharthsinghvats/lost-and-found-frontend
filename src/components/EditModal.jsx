import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import { AiOutlineFileImage } from "react-icons/ai";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const user = JSON.parse(localStorage.getItem("user"));

export default function EditModal({ card }) {
    console.log(card);
  const [basicModal, setBasicModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const [itemName, setItemName] = useState(card.itemName);
  const [itemDescription, setItemDescription] = useState(card.itemDescription);
  const [lostAtLandmark, setLostAtLandmark] = useState(card.lostAtLandmark);
  const [itemImg, setItemImg] = useState(card.itemImg);
  const [imageName, setImageName] = useState("Upload Item Image");

  const toggleShow = () => setBasicModal(!basicModal);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("itemName", itemName);
    data.append("itemDescription", itemDescription);
    data.append("lostAtLandmark", lostAtLandmark);
    data.append("itemImg", itemImg);
    data.append("foundBy", user._id);


    try {
      const response = await fetch(BACKEND_URL+"/lost/edit/"+card._id, {
        method: "PUT",
        body: data,
      });
      setLoading(false);
      if (response.ok) {
        console.log(response);
        window.location.reload();
      } else {
        console.error("Form data updation failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred while updating the form data:", error);
    }
    toggleShow();
  };

  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle style={{ textAlign: "center" }}>
                Input Found Item Details
                {loading && (
                  <lottie-player
                    src="https://assets6.lottiefiles.com/packages/lf20_a2chheio.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                    style={{
                      height: "60px",
                      position: "absolute",
                      top: "1.5rem",
                      left: "-0.5rem",
                    }}
                  ></lottie-player>
                )}
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="lost-item-form">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                <textarea
                  placeholder="Brief Description"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  style={{
                    width: "80%",
                    minHeight: "120px",
                    scrollbarWidth: "0px !important",
                    marginBottom: "20px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                ></textarea>
                <input
                  type="text"
                  placeholder="Location you lost it at"
                  value={lostAtLandmark}
                  onChange={(e) => setLostAtLandmark(e.target.value)}
                />
                <div className="image-upload">
                  <label style={{ cursor: "pointer" }}>
                    <AiOutlineFileImage
                      style={{ marginRight: "6px", fontSize: "large" }}
                    />
                    {imageName}
                    <input
                      type="file"
                      onChange={(e) => {
                        setItemImg(e.target.files[0]);
                        setImageName(e.target.files[0].name);
                      }}
                    />
                  </label>
                </div>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                style={{ backgroundColor: "#54b0bf" }}
                onClick={toggleShow}
              >
                Cancel
              </MDBBtn>
              <MDBBtn
                style={{ backgroundColor: "#2E8A99" }}
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
