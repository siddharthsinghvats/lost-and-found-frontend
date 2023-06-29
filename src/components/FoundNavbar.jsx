import { useState } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../assets/laf_logo.png";
import { Link, useNavigate } from "react-router-dom";
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
const pages = ["Found An Item ?", "Lost Items List"];
const settings = ["Profile", "Logout"];

const user = JSON.parse(localStorage.getItem("user"));

function FoundNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  const goToProfile = () => {
    navigate("/profile");
  };
  const [basicModal, setBasicModal] = useState(false);

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [foundAtLandmark, setFoundAtLandmark] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [imageName, setImageName] = useState("Upload Item Image");
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("itemName", itemName);
    data.append("itemDescription", itemDescription);
    data.append("foundAtLandmark", foundAtLandmark);
    data.append("itemImg", itemImg);
    data.append("foundBy", user._id);
    data.append("user", JSON.stringify(user));

    try {
      const response = await fetch(BACKEND_URL+"/found/new", {
        method: "POST",
        body: data,
      });
      setLoading(false);
      if (response.ok) {
        console.log(response);
        window.location.reload();
      } else {
        console.error("Form data submission failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred while submitting the form data:", error);
    }
    toggleShow();
  };

  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <>
     <div className="new" >
        <lottie-player
          src="https://assets3.lottiefiles.com/packages/lf20_tf6wSv.json"
          background="transparent"
          speed="0.5"
          style={{height:"100px", cursor:"pointer"}}
          loop
          autoplay
          onClick= {toggleShow}
        ></lottie-player>
      </div>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent className="lost-form">
            <MDBModalHeader style={{border:"none"}}>
              <MDBModalTitle style={{ textAlign: "center" , color:"white"}}>
             Found Item Details
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
                style={{color:"white !important", backgroundColor:"red"}}
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <lottie-player
                src="https://assets2.lottiefiles.com/packages/lf20_rkra4gwo.json"
                background="transparent"
                speed="1"
                loop
                style={{
                  height: "100px",
                  width: "120px",
                  position: "absolute",
                  bottom: "-4rem",
                }}
                autoplay
              ></lottie-player>
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
                    padding:"10px"
                  }}
                ></textarea>
                <input
                  type="text"
                  placeholder="Location you found it at"
                  value={foundAtLandmark}
                  onChange={(e) => setFoundAtLandmark(e.target.value)}
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

            <MDBModalFooter style={{border:"none"}}>
              <MDBBtn
                 style={{ backgroundColor: "#070590" }}
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <AppBar position="static" className="nav-bar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img className="nav-logo" src={logo} alt="" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={()=>{handleCloseNavMenu(); toggleShow();}} className="nav-link">
                  <Typography textAlign="center">Found An Item?</Typography>
                </MenuItem>
           
                  <MenuItem onClick={()=>{handleCloseNavMenu(); navigate('/lost')}} >
                    <Typography textAlign="center">Lost Items List</Typography>
                  </MenuItem>
        
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img className="nav-logo" src={logo} alt="" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={toggleShow}
                sx={{ my: 3, mx: 3, color: "white", display: "block" }}
              >
                FOUND AN ITEM?
              </Button>
              <Link to="/lost">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 3, mx: 3, color: "white", display: "block" }}
                >
                  LOST ITEMS LIST
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user.profileImg} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={goToProfile}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default FoundNavbar;
