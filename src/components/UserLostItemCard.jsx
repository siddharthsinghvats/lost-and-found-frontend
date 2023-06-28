

import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Loading from "./Loading";
import { Button, CardActionArea, CardActions } from "@mui/material";
import image from "../assets/login.png";
import EditModal from "./EditModal";
import { AiFillWarning } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
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
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";

import { BorderBottom } from "@mui/icons-material";
const user = JSON.parse(localStorage.getItem("user"));
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function UserLostItemCard({ card }) {
  // console.log(card);

  const user = JSON.parse(localStorage.getItem("user"));

  const [basicModal, setBasicModal] = useState(false);
  const [popupImage, setPopupImage] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [lostAtLandmark, setLostAtLandmark] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [imageName, setImageName] = useState("Upload Item Image");
  const toggleShow = () => setBasicModal(!basicModal);
  const toggleImage = () => setPopupImage(!popupImage);
  const toggleDelete = () => {
    setDeleteWarning(!deleteWarning);
  };
  const handleFoundClick = (id) => {
    const updateCard = async () => {
      try {
        const response = await fetch(BACKEND_URL+`/lost/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ foundBy: user._id }),
        });

        if (response.ok) {
          // Card updated successfully
          console.log("Card updated successfully");
          window.location.reload();
        } else {
          // Handle the error case
          console.error("Failed to update card");
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

    updateCard();
  };
  const handleDelete = async (id) => {
    try {
      const resp = await fetch(BACKEND_URL+`/lost/${id}`, {
        method: "delete",
      });
      console.log(resp);
      window.location.reload();
    } catch (err) {
      console.log("failed deletion");
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const [foundBy, setFoundBy] = useState("None");
  const [lostBy, setLostBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = React.useState(null);
  var f = 0;
  React.useEffect(() => {
    const fun = async () => {
      try {
        const url = BACKEND_URL+"/lost/" + card;
        console.log(url);
        const resp = await fetch(url);
        const data = await resp.json();
        setCardData(data);
        setLoading(false);
      } catch (err) {
        console.log("could not get card");
      }
    };
    fun();
  }, []);
  React.useEffect(() => {
    if (cardData?.foundBy) {
      const fun = async () => {
        try {
          const url = BACKEND_URL+"/user/" + cardData.foundBy;
          console.log(url);
          const resp = await fetch(url);
          const user = await resp.json();
          setFoundBy(user.name);
        } catch (err) {
          console.log("could not get foundBy");
        }
      };
      fun();
    }
    setItemName(cardData?.itemName);
    setItemDescription(cardData?.itemDescription);
    setLostAtLandmark(cardData?.lostAtLandmark);
  }, [cardData]);

  const [edit, setEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const toggleEdit = () => setEdit(!edit);

  const handleSubmit = async (e) => {
    setEditLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("itemName", itemName);
    data.append("itemDescription", itemDescription);
    data.append("lostAtLandmark", lostAtLandmark);
    if (itemImg != "") data.append("itemImg", itemImg);
    data.append("lostBy", user._id);

    try {
      const response = await fetch(BACKEND_URL+"/lost/edit/" + card, {
        method: "PUT",
        body: data,
      });
      setEditLoading(false);
      if (response.ok) {
        console.log(response);
        window.location.reload();
      } else {
        console.error("Form data updation failed");
      }
    } catch (error) {
      setEditLoading(false);
      console.error("An error occurred while updating the form data:", error);
    }
    toggleEdit();
  };

  const navigate = useNavigate();
  const handleGoToProfile = () => {
    if (cardData.foundBy && cardData.foundBy != user._id)
      navigate(`/user/${cardData.foundBy}`);
  };

  const goToUserProfile = () => {
    navigate(`/user/${lostBy}`);
  };
  if (loading) return <Loading />;

  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog
          style={{ border: "2px solid red", borderRadius: "10px" }}
        >
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AiFillWarning /> &nbsp;Attention
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ fontSize: "larger" }}>
              If you found this item then you will be liable to return it. Any
              loss or concerns regarding the item will be your responsibility.
              Click <strong> OK</strong> to proceed.
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color=""
                style={{ backgroundColor: "#4eded7" }}
                onClick={toggleShow}
              >
                Close
              </MDBBtn>
              <MDBBtn
                style={{ backgroundColor: "#11736f" }}
                onClick={() => {
                  handleFoundClick(cardData?._id);
                }}
              >
                OK
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={deleteWarning} setShow={setDeleteWarning} tabIndex="-1">
        <MDBModalDialog
          style={{ border: "2px solid red", borderRadius: "10px" }}
        >
          <MDBModalContent>
            <MDBModalBody style={{ fontSize: "larger", textAlign: "center" }}>
              <AiFillWarning style={{ color: "#c40404", fontSize: "6rem" }} />
              <br />
              Delete this item ?<br />
              Click <strong> OK</strong> to proceed.
            </MDBModalBody>

            <MDBModalFooter
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <MDBBtn
                style={{ backgroundColor: "#d18a8a" }}
                onClick={toggleDelete}
              >
                Close
              </MDBBtn>
              <MDBBtn
                style={{ backgroundColor: "#ff1000" }}
                onClick={() => {
                  handleDelete(cardData?._id);
                }}
              >
                OK
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal
        show={popupImage}
        setShow={setPopupImage}
        tabIndex="2"
        className="modal-lg"
      >
        <MDBModalDialog
          style={{ border: "2px solid green", borderRadius: "10px" }}
          className="popup-image-card"
        >
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleImage}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <img src={cardData?.itemImg} alt="" className="popup-image" />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color=""
                style={{ backgroundColor: "#008391" }}
                onClick={toggleImage}
              >
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={edit} setShow={setEdit} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent className="lost-form">
            <lottie-player
              src="https://assets6.lottiefiles.com/packages/lf20_ii6qdbgz.json"
              background="transparent"
              speed="1"
              loop
              style={{
                height: "100px",
                width: "100px",
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
              }}
              autoplay
            ></lottie-player>
            <MDBModalHeader style={{ border: "none" }}>
              <MDBModalTitle style={{ textAlign: "center", color: "white" }}>
                Edit Lost Item Details
                {editLoading && (
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
                style={{ backgroundColor: "red" }}
                onClick={toggleEdit}
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

            <MDBModalFooter style={{ border: "none" }}>
              <MDBBtn
                style={{ backgroundColor: "" }}
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
          #070590
        </MDBModalDialog>
      </MDBModal>

      {
        <Card
          sx={{
            minWidth: 375,
            maxWidth: "375px",
            margin: "1.5rem",
            borderRadius: "10px",
          }}
          className="lost-card"
        >
          <CardActionArea>
            <div
              className="card-image"
              onClick={toggleImage}
              style={{ cursor: "pointer" }}
            >
              <CardMedia
                className="card-img"
                component="img"
                image={cardData.itemImg}
                alt="green iguana"
              />
            </div>

            <CardContent>
              <Typography
                className="bold-green"
                gutterBottom
                variant="h5"
                component="div"
                style={{ width: "100%", textAlign: "center", margin: "15px 0" }}
              >
                {cardData.itemName}
              </Typography>
              <Typography
                component={"span"}
                variant="body2"
                color="text.secondary"
              >
                <MDBContainer>
                  <MDBRow className="mb-3">
                    <MDBCol size="6" className="bold-green">
                      Description:
                    </MDBCol>
                    <MDBCol
                      size="6"
                      style={{
                        color: "white",
                        overflow: "hidden",
                        maxHeight: "100%",
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div id="description-content">
                        {cardData.itemDescription}
                      </div>
                      {isHovered && (
                        <div id="description-expanded">
                          {cardData.itemDescription}
                        </div>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="6" className="bold-green">
                      Lost At Location:
                    </MDBCol>
                    <MDBCol size="6" style={{ color: "white" }}>
                      {cardData.lostAtLandmark}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="6" className="bold-green">
                      Lost At Date:
                    </MDBCol>
                    <MDBCol size="6" style={{ color: "white" }}>
                      {cardData.lostDate}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="6" className="bold-green">
                      Found By:
                    </MDBCol>
                    <MDBCol
                      size="6"
                      onClick={handleGoToProfile}
                      style={{
                        color: cardData.foundBy ? "cyan" : "white",
                        textDecoration: cardData.foundBy ? "underline" : "none",
                        cursor: "pointer",
                      }}
                    >
                      {foundBy}
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {cardData.foundBy ? (
              <div className="found-tag">Found</div>
            ) : (
              <Button
                style={{ marginTop: "1rem", color: "#00DFA2" }}
                onClick={toggleShow}
              >
                Found this item?
              </Button>
            )}
            <Button
              style={{ marginTop: "1rem", color: "#4D77FF" }}
              onClick={() => {
                setEdit(true);
              }}
            >
              EDIT
            </Button>
            <Button
              size="large"
              style={{
                color: "#FF4848",
                marginTop: "1rem",
                marginLeft: "auto",
                fontSize: "1.5rem",
              }}
              onClick={() => {
                toggleDelete();
              }}
            >
              <AiOutlineDelete />
            </Button>
          </CardActions>
        </Card>
      }
    </>
  );
}

export default UserLostItemCard;
