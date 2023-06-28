import { MDBContainer } from "mdb-react-ui-kit";
import LostItemCard from "./LostItemCard";
import LostNavbar from "./LostNavbar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import Loading from "./Loading";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const LostItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BACKEND_URL+"/lost/");

        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData);

          setData(jsonData);
          console.log(data);
          setLoading(false);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [loading]);

  return (
    <>
     
      {loading ? (
        <Loading />
      ) : (
        <>
          <LostNavbar />
          <h1 className="heading" style={{ color: "#F86F03" }}>
            LOST
          </h1>
          {data.length === 0 ? (
            <div className="lottie">
              <h1 className="heading" style={{ color: "#C21010" }}>
                Nothing Here !
              </h1>
              <lottie-player
                src="https://assets6.lottiefiles.com/packages/lf20_HWVYXZ8WMf.json"
                background="transparent"
                style={{
                  width: "40%",
                }}
                speed="0.8"
                loop
                autoplay
              ></lottie-player>
            </div>
          ) : (
            <>
              <MDBContainer className="d-flex  flex-wrap justify-content-around align-items-center">
                {data.map((item) => (
                  <LostItemCard card={item} />
                ))}
              </MDBContainer>
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
};
export default LostItems;
