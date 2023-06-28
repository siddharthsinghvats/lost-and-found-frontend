import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import image from "../assets/login.png";
import { AiFillWarning } from "react-icons/ai";
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
import { useNavigate } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user"));

function FoundItemCard({ card }) {
  const [basicModal, setBasicModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

  const [popupImage, setPopupImage] = useState(false);
  const toggleImage = () => setPopupImage(!popupImage);

  const [claimedBy, setClaimedBy] = useState("None");
  const [foundBy, setFoundBy] = useState("Loading...");

  React.useEffect(() => {
    const fun = async () => {
      if (card.claimedBy) {
        const resp = await fetch(
          BACKEND_URL+`/user/${card.claimedBy}`
        );
        const user = await resp.json();
        setClaimedBy(user.name);
      }
    };
    fun();
    const found = async () => {
      const resp = await fetch( BACKEND_URL+`/user/${card.foundBy}`);
      const user = await resp.json();
      setFoundBy({ name: user.name, profileImg: user.profileImg });
    };
    found();
  }, []);
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
  const navigate = useNavigate();
  const goToProfile = (id) => {
    if (id == user._id) {
      navigate(`/profile`);
      return;
    }
    if (id) navigate(`/user/${id}`);
  };
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
                  handleClaimClick(card._id);
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
              <img src={card.itemImg} alt="" className="popup-image" />
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

      <Card
        sx={{
          maxWidth: "355px",
          minWidth: "355px",
          margin: "1.5rem",
          borderRadius: "10px",
          position: "relative",
        }}
        className="lost-card"
      >
        <CardActionArea>
          <div className="card-image">
            <CardMedia
              className="card-img"
              component="img"
              image={card.itemImg}
              alt="green iguana"
              onClick={toggleImage}
              style={{ cursor: "pointer" }}
            />
          </div>

          <CardContent>
            {foundBy == "Loading..." ? (
              foundBy
            ) : (
              <div
                className="card-post-user"
                onClick={() => goToProfile(card.foundBy)}
              >
                <img src={foundBy.profileImg} alt="" />
                {foundBy.name}
              </div>
            )}
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ width: "100%", textAlign: "center", margin: "15px 0" }}
            >
              {card.itemName}
            </Typography>
            <Typography
              component={"span"}
              variant="body2"
              color="text.secondary"
            >
              <MDBContainer>
                <MDBRow className="mb-3">
                  <MDBCol size="6" className="bold-green">
                    Description:{" "}
                  </MDBCol>
                  <MDBCol
                    size="6"
                    id={`description-col ${isHovered ? "expanded" : ""}`}
                    style={{
                      color: "white",
                      overflow: "hidden",
                      maxHeight: "100%",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div id="description-content">
                      {card.itemDescription}
                    </div>
                    {isHovered && (
                      <div id="description-expanded">
                        {card.itemDescription}
                      </div>
                    )}
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                  <MDBCol size="6" className="bold-green">
                    Found At Loc. :
                  </MDBCol>
                  <MDBCol size="6" style={{ color: "white" }}>
                    {card.foundAtLandmark}
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                  <MDBCol size="6" className="bold-green">
                    Found At Date:
                  </MDBCol>
                  <MDBCol size="6" style={{ color: "white" }}>
                    {card.foundDate}
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                  <MDBCol size="6" className="bold-green">
                    Claimed By:
                  </MDBCol>
                  <MDBCol
                    size="6"
                    style={{
                      cursor: card.claimedBy ? "pointer" : "",
                      color: card.claimedBy ? "cyan" : "white",
                      textDecoration: card.claimedBy ? "underline" : "none",
                    }}
                    onClick={() => {
                      goToProfile(card.claimedBy);
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
          {card.claimedBy ? (
            <div className="claimed-tag">Claimed</div>
          ) : (
            card.foundBy != user._id && (
              <Button
                size="small"
                style={{ color: "cyan" }}
                onClick={toggleShow}
              >
                Claim this item
              </Button>
            )
          )}
        </CardActions>
      </Card>
    </>
  );
}

export default FoundItemCard;
