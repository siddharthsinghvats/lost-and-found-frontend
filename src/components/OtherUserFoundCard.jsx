

import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
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

function OtherUserFoundItemCard({ card }) {
  // console.log(card);
  const curUser = useParams();
  const [popupImage, setPopupImage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const toggleImage = () => setPopupImage(!popupImage);

  const [claimedBy, setClaimedBy] = useState("None");
  const [foundBy, setFoundBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = React.useState(null);
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  const handleClaimClick = (id) => {
    const updateCard = async () => {
      try {
        const response = await fetch(BACKEND_URL+`/found/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ claimedBy: user._id }),
        });

        if (response.ok) {
          // Card updated successfully
          console.log("Card updated successfully");
          // window.location.reload();
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

  React.useEffect(() => {
    const fun = async () => {
      try {
        const url = BACKEND_URL+"/found/" + card;
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
    if (cardData?.claimedBy) {
      const fun = async () => {
        try {
          const url = BACKEND_URL+"/user/" + cardData.claimedBy;
          console.log(url);
          const resp = await fetch(url);
          const user = await resp.json();
          setClaimedBy(user.name);
          setLoading(false);
        } catch (err) {
          console.log("could not get foundBy");
        }
      };
      fun();
    }
  }, [cardData]);

  const navigate = useNavigate();
  const handleGoToProfile = () => {
    if (cardData.claimedBy && cardData.claimedBy != user._id)
      navigate(`/user/${cardData.claimedBy}`);
  };

  const goToUserProfile = () => {
    navigate(`/user/${foundBy}`);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
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
              <img src={cardData.itemImg} alt="" className="popup-image" />
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
              Claim item only if it is yours , false claim report can result in
              your account ban and a warning may be issued to the authorities.
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
                  handleClaimClick(cardData._id);
                }}
              >
                OK
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <Card
        sx={{
          minWidth: 355,
          maxWidth: "350px",
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
                    {" "}
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
                    Found At Loc. :
                  </MDBCol>
                  <MDBCol size="6" style={{ color: "white" }}>
                    {cardData.foundAtLandmark}
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                  <MDBCol size="6" className="bold-green">
                    Found At Date:
                  </MDBCol>
                  <MDBCol size="6" style={{ color: "white" }}>
                    {cardData.foundDate}
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                  <MDBCol size="6" className="bold-green">
                    Claimed By:
                  </MDBCol>
                  <MDBCol
                    size="6"
                    onClick={handleGoToProfile}
                    style={{
                      color: cardData.claimedBy ? "cyan" : "white",
                      textDecoration: cardData.claimedBy ? "underline" : "none",
                      cursor: "pointer",
                    }}
                  >
                    {claimedBy}
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {cardData.claimedBy ? (
            <div className="claimed-tag">Claimed</div>
          ) : (
            <Button
              size="small"
              style={{ color: "#A8FF3E" }}
              onClick={toggleShow}
            >
              Claim this item
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}

export default OtherUserFoundItemCard;
