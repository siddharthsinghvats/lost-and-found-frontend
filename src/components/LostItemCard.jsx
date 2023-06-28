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
import { Link, useNavigate } from "react-router-dom";
import { BorderBottom } from "@mui/icons-material";
const user = JSON.parse(localStorage.getItem("user"));
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL



function LostItemCard({ card }) {
  const [basicModal, setBasicModal] = useState(false);
  const [popupImage, setPopupImage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const toggleShow = () => setBasicModal(!basicModal);
  const toggleImage = () => setPopupImage(!popupImage);
  const handleFoundClick = (id) => {
    const updateCard = async () => {
      try {
        const response = await fetch(BACKEND_URL+'/lost/'+id, {
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

  const [foundBy, setFoundBy] = useState("NA");
  const [lostBy, setLostBy] = useState("");
  React.useEffect(() => {
    if (card.foundBy) {
      const fun = async () => {
        try {
          const url = BACKEND_URL +"/user/" + card.foundBy;
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

    const getLostBy = async () => {
      try {
        const url = BACKEND_URL+'/user/' + card.lostBy;
        console.log(url);
        const resp = await fetch(url);
        const user = await resp.json();
        setLostBy({ name: user.name, profileImg: user.profileImg });
      } catch (err) {
        console.log("could not get foundBy");
      }
    };
    getLostBy();
  }, []);

  const navigate = useNavigate();
  const handleGoToProfile = () => {
    if (card.foundBy) navigate(`/user/${card.foundBy}`);
  };

  const goToUserProfile = () => {
    if(card.lostBy==user._id){
      navigate('/profile');
      return;
    }
    navigate(`/user/${card.lostBy}`);
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
                  handleFoundClick(card._id);
                }}
              >
                OK
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={popupImage} setShow={setPopupImage} tabIndex="2" className="modal-lg" >
        <MDBModalDialog
          style={{  border: "2px solid green", borderRadius: "10px" }}
          className="popup-image-card"
        >
          <MDBModalContent className="img-pop">
            <MDBModalHeader>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleImage}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
             <img src={card.itemImg} alt="" className="popup-image"/>
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
          minWidth: 360,
          maxWidth:"360px",
          margin: "1.5rem",
          borderRadius: "10px",
        }}
        className="lost-card"
      >
        <CardActionArea>
          <div className="card-image" onClick={toggleImage} style={{cursor:"pointer"}}>
            <CardMedia
              className="card-img"
              component="img"
              image={card.itemImg}
              alt="green iguana"
              
            />
          </div>

          <CardContent>
            {lostBy == "" ? (
              <div className="card-post-user">Loading...</div>
            ) : (
              <div className="card-post-user" onClick={goToUserProfile}>
                <img src={lostBy.profileImg} alt="" />
                {lostBy.name}
              </div>
            )}
            <Typography
              className="bold-green"
              gutterBottom
              variant="h5"
              style={{width:"100%",textAlign:"center", margin:"15px 0"}}
              component="div"
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
                    Description:
                  </MDBCol>
                  <MDBCol size="6" id={`description-col ${isHovered ? "expanded" : ""}`}
                    style={{
                      color: "white",
                      overflow: "hidden",
                      maxHeight: "100%",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>

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
                    Lost At Location:
                  </MDBCol>
                  <MDBCol size="6"  style={{color:"white"}}>{card.lostAtLandmark}</MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                  <MDBCol size="6" className="bold-green">
                    Lost At Date:
                  </MDBCol>
                  <MDBCol size="6"  style={{color:"white"}}>{card.lostDate}</MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                  <MDBCol size="6" className="bold-green">
                    Found By:
                  </MDBCol>

                  <MDBCol
                    size="6"
                    onClick={handleGoToProfile}
                    style={{
                      color: card.foundBy ? "cyan" : "white",
                      textDecoration: card.foundBy ? "underline" : "none",
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
          {card.foundBy ? (
            <div className="found-tag"> 
              Found
            </div>
          ) : (
            <Button size="small" style={{color:"cyan"}} onClick={toggleShow}>
              Found this item?
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}

export default LostItemCard;
