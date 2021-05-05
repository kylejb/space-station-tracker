import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Canvas from 'common/components/canvas';
import Globe from './globe';

import { fetchISS, getSatellite } from './earthSlice';

import EoxSentinal2CloudlessLayer from 'common/api/EoxSentinal2CloudlessLayer';
import EnhancedAtmosphereLayer from 'common/api/EnhancedAtmosphereLayer';
import EnhancedStarFieldLayer from 'common/api/EnhancedStarFieldLayer';

import WorldWind from 'worldwindjs';


const baseLayer = new WorldWind.BMNGLayer();
const starFieldLayer = new WorldWind.StarFieldLayer();
const atmosphereLayer = new EnhancedAtmosphereLayer("https://unpkg.com/worldwindjs@1.7.0/build/dist/images/dnb_land_ocean_ice_2012.png");

const issLayer = new WorldWind.RenderableLayer("ISS");

const defaultEarthLayers = [
    baseLayer,
    starFieldLayer,
    atmosphereLayer,
    issLayer,
]

const Earth = ({
    searchResult,
    ...props
}) => {
    const canvasRef = useRef(null);
    const [wwd, setWWD] = useState(null);
    const [earthLayers, setEarthLayers] = useState(defaultEarthLayers);
    const [firstLoad, setFirstLoad] = useState(true);
    const satelliteData = useSelector(getSatellite);
    const { status, satelliteCollection } = satelliteData;

    const setBaseUrl = (baseUrl) => {
        WorldWind.configuration.baseUrl = baseUrl;
    }

    // Hardcoded to assume only ISS in SatelliteCollection for MVP
    const getSatellitePosition = () => new WorldWind.Position(satelliteCollection[0].latitude, satelliteCollection[0].longitude, 80000.0);

    const updateSatellite = () => {
        const issLayer = earthLayers[3];

        const newPosition = getSatellitePosition(); //! hardcoded
        for ( let i = 0; i < satelliteCollection.length; i++ ) {
            issLayer.renderables[i].position.latitude = newPosition.latitude;
            issLayer.renderables[i].position.longitude = newPosition.longitude;
            issLayer.renderables[i].position.altitude = newPosition.altitude;
        }

        /*
          TODO: update Satellite model's position on state change
            - issLayer.renderables[i].position is correctly being reset based on above
            - model does not re-render; is there an alternative to removing and adding new?
        **
        */
    }

    const renderSatellite = () => {
        //? console.log("if", wwd.layers[3]);
        // TODO - improve logic for removingOldLayer before replacing with updatedLayer
        //* Alternatively, try to move object to next position (i.e., coords)
        // if (wwd.layers[3]) {
        //     new WorldWind.RenderableLayer().removeRenderable(wwd.layers[3].renderables[0])
        // }
        const issLayer = earthLayers[3]
        wwd.addLayer(issLayer)

        // Position takes the following position arguments: lat, lon, altitude
        const config = {dirPath: WorldWind.configuration.baseUrl};
        const colladaLoader = new WorldWind.ColladaLoader(getSatellitePosition(), config);

        colladaLoader.load('satellite.dae', function (colladaModel) {
            colladaModel.scale = 1500;
            issLayer.addRenderable(colladaModel);
        })
    }

    const dispatch = useDispatch();

    useEffect(() => {
        const wwd = new Globe("globe-canvas");
        wwd.addLayer(earthLayers[0], {
            // Add layers to the globe
            category: "base"
        });

        wwd.addLayer(earthLayers[1], {
            category: "star-background"
        });

        wwd.addLayer(earthLayers[2], {
            category: "enhanced-atmosphere"
        });

        setWWD(wwd.wwd);
        const interval = setInterval(() => {
            dispatch(fetchISS());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    //

    useEffect(() => {
        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        if (wwd) {
            // Set a date property for the StarField and Atmosphere layers to the current date and time.
            // This enables the Atmosphere layer to show a night side (and dusk/dawn effects in Earth's terminator).
            // The StarField layer positions its stars according to this date.
            const now = new Date();
            // earthLayers[1].time = now;
            earthLayers[2].time = now;

            // In this example, each full day/night cycle lasts 8 seconds in real time.
            const simulatedMillisPerDay = 10000;

            // Begin the simulation at the current time as provided by the browser.
            const startTimeMillis = Date.now();

            function runSimulation() {
                // Compute the number of simulated days (or fractions of a day) since the simulation began.
                const elapsedTimeMillis = Date.now() - startTimeMillis;
                const simulatedDays = elapsedTimeMillis / simulatedMillisPerDay;

                // Compute a real date in the future given the simulated number of days.
                const millisPerDay = 24 * 3600 * 1000; // 24 hours/day * 3600 seconds/hour * 1000 milliseconds/second
                const simulatedMillis = simulatedDays * millisPerDay;
                const simulatedDate = new Date(startTimeMillis + simulatedMillis);

                // Update the date in both the Starfield and the Atmosphere layers.
                // earthLayers[1].time = simulatedDate;
                earthLayers[2].time = simulatedDate;
                wwd.redraw(); // Update the WorldWindow scene.

                canvasRef.current.runSim = requestAnimationFrame(runSimulation);
            }
            // Animate the starry sky as well as the globe's day/night cycle.
            canvasRef.current.runSim = requestAnimationFrame(runSimulation);
            const refRunSim = canvasRef.current.runSim;
            return () => cancelAnimationFrame(refRunSim);

            // Create a layer manager for controlling layer visibility.
            // const layerManager = new LayerManager(wwd);
        }

    }, [wwd]);

    useEffect(() => {
        if (firstLoad && status === "succeeded") {
            renderSatellite();
            setFirstLoad(false);
        } else if (status === "succeeded") {
            updateSatellite();
        }
        // dispatch(fetchISS());
    }, [satelliteCollection]);


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
