import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Canvas from 'common/components/canvas';
import Globe from 'common/components/globe';

import EoxSentinal2CloudlessLayer from 'common/api/EoxSentinal2CloudlessLayer';
import EnhancedAtmosphereLayer from 'common/api/EnhancedAtmosphereLayer';

import WorldWind from 'worldwindjs';


const Earth = ({
    searchResult,
    ...props
}) => {
    const canvasRef = useRef(null);
    const [earthMetadata, setEarthMetadata] = useState({
        isValid: false,
        isDropArmed: false,
        wwd: null,
        nextLayerId: 1,
        categoryTimestamps: new Map(),
        roundGlobe: null,
        flatGlobe: null,
        dropCallback: null,
    })

    const setBaseUrl = (baseUrl) => {
        WorldWind.configuration.baseUrl = baseUrl;
    }
    useEffect(() => {
        const globe = new Globe("globe-canvas");
        globe.addLayer(new WorldWind.BMNGLayer(), {
        // Add layers to the globe
            category: "base"
        });
    }, []);

    return <Canvas ref={canvasRef} id="globe-canvas" />;
}

Earth.propTypes = {
    /**
     * An array of layer type strings, WorldWind.Layer objects, and/or layer
     * configuration objects, e.g., {layer: String|WorldWind.Layer, options: Object}
     */
    layers: PropTypes.array,
    /**
     * Latitude +/-90 degrees
     */
    latitude: PropTypes.number,
    /**
     * Longitude +/-180 degrees
     */
    longitude: PropTypes.number,
    /**
     * Altitude in meters above sea level (MSL)
     */
    altitude: PropTypes.number,
    /**
     * A projection identifier string
     */
    projection: PropTypes.string,
    /**
     * Background color CSS string
     */
    backgroundColor: PropTypes.string,
    /**
     * The id of an existing canvas to attach the Globe
     */
    canvasId: PropTypes.string,
    /**
     * A callback function to push state up to the parent
     */
    onUpdate: PropTypes.func
};

export default Earth;
