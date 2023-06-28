import lottie from "lottie-web";
import { useEffect } from "react";
import loadingLogo from '../assets/loading.json'


const Loading = ()=>{
    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#loading"),
          animationData: loadingLogo
        });
      }, []);
    return (
        <div id="loading">

        </div>
    )
}

export default Loading;