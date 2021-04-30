import { useEffect } from 'react';
import Canvas from 'common/components/canvas';
import Globe from 'common/components/globe';
import WorldWind from 'worldwindjs';


const Earth = ({ searchResult, ...props }) => {
    useEffect(() => {
        const globe = new Globe("globe-canvas");
        globe.addLayer(new WorldWind.BMNGLayer(), {
        // Add layers to the globe
            category: "base"
        });
    }, []);


    return <Canvas id="globe-canvas" />;
}

export default Earth;
