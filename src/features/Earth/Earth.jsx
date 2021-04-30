import Globe from 'components/globe';
import WorldWind from 'worldwindjs';

const globe = new Globe("globe-canvas");
// Add layers to the globe
globe.addLayer(new WorldWind.BMNGLayer(), {
    category: "base"
});

const Earth = () => {

    return null;
}

export default Earth;
