import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import LostItemCard from "./LostItemCard";
import FoundItemCard from "./FoundItemCard";
import UserLostItemCard from "./UserLostItemCard";
import UserFoundItemCard from "./UserFoundItemCard";
import { Scrollbar } from "react-scrollbars-custom";
import Footer from "./Footer";
import ProfileNavbar from "./ProfileNavbar";
import Loading from "./Loading";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const savedUser = JSON.parse(localStorage.getItem("user"));
export default function Profile() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [swipe, setSwipe] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(BACKEND_URL + `/user/${savedUser._id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        setLoading(false);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    console.log(user);
  }, []);
  setTimeout(() => {
    setSwipe(false);
  }, 5000);
  return (
    <>
      {loading || !user ? (
        <Loading />
      ) : (
        <>
          <ProfileNavbar />
          <div className="my-profile">
            <div className="banner">
              <div className="rotate-anim">
                <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_iCsx2UJOgF.json"
                  background="transparent"
                  speed="1"
                  className="profile-bg"
                  loop
                  style={{
                    height: "350px",
                    width: "350px",
                  }}
                  autoplay
                ></lottie-player>
                <img src={user.profileImg} alt="" />
              </div>
              <div className="username">
                <h1>{user.name}</h1>
                <div className="email-phone">
                  <h5>
                    <AiOutlineMail style={{display:"inline"}} />
                    &nbsp; &nbsp;{user.email}
                  </h5>
                  <h5>
                    <BsPhone style={{display:"inline"}} /> &nbsp; &nbsp;{user.contactNumber}
                  </h5>
                </div>
              </div>
            </div>
            <h1 className="heading" style={{ color: "#FF0000" }}>
              LOST POSTS ({user.lostPosts.length})
            </h1>

            <div className="user-lost-post">
              {swipe && (
                <lottie-player
                  src="https://assets5.lottiefiles.com/packages/lf20_IteuUq.json"
                  background="transparent"
                  speed="0.5"
                  loop
                  autoplay
                  style={{
                    position: "absolute",
                    zIndex: "10",
                    height: "250px",
                    width: "200px",
                    top: "32%",
                    left: "50%",
                  }}
                ></lottie-player>
              )}
              {!user.lostPosts ? (
                <div className="lottie">
                  (
                  <lottie-player
                    src="https://assets6.lottiefiles.com/packages/lf20_HWVYXZ8WMf.json"
                    background="transparent"
                    style={{
                      width: "20%",
                    }}
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  )
                </div>
              ) : (
                user.lostPosts.map((item, index) => (
                  <UserLostItemCard key={item + "$" + index} card={item} />
                ))
              )}
            </div>
            <h1 className="heading" style={{ color: "#59CE8F" }}>
              FOUND POSTS ({user.foundPosts.length})
            </h1>
            <div className="user-found-post">
              {!user.foundPosts ? (
                <div className="lottie">
                  <lottie-player
                    src="https://assets6.lottiefiles.com/packages/lf20_HWVYXZ8WMf.json"
                    background="transparent"
                    style={{
                      width: "20%",
                    }}
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                </div>
              ) : (
                user.foundPosts.map((item) => <UserFoundItemCard card={item} />)
              )}
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}
