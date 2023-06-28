import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import options from "../assets/particle";
const App = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        
    }, []);

    return (
        <Particles style={{height:"100vh", width:"100vw", zIndex:"-10 !important"}} id="tsparticles"  options={options} init={particlesInit} loaded={particlesLoaded} />
    );
};
export default App;