import { MDBContainer } from "mdb-react-ui-kit";
import FoundNavbar from "./FoundNavbar";
import FoundItemCard from "./FoundItemCard";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Loading from "./Loading";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const FoundItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BACKEND_URL+"/found");

        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData);
          setData(jsonData);
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
          <FoundNavbar />
          <h1 className="heading" style={{ color: "#36AE7C" }}>
          FOUND
          </h1>{
            data.length==0?<div className="lottie">
            <h1 className="heading" style={{ color: "#C21010" }}>
              Nothing Here !
              </h1>
          <lottie-player
            src="https://assets6.lottiefiles.com/packages/lf20_HWVYXZ8WMf.json"
            background="transparent"
            style={{
              width: "38%",
            }}
            speed="0.8"
            loop
            autoplay
          ></lottie-player>
          </div>:
          <MDBContainer className="found-items d-flex flex-wrap justify-content-around">
            {data.map((item) => (
              <FoundItemCard card={item} />
            ))}
          </MDBContainer>
}
          <Footer />
        </>
      )}
    </>
  );
};
export default FoundItems;
