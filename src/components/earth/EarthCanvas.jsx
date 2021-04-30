import useViewport from 'hooks/useViewport';
import { useEffect, useState } from 'react';
import WorldWind from 'worldwindjs';

const EarthCanvas = ({ satelliteCollection, ...customAttributes }) => {
    const [wwd, setWWD] = useState(null);

    const threeDimTest = () => {
        const polygonLayer = new WorldWind.RenderableLayer();
        wwd.addLayer(polygonLayer);

        const polygonAttributes = new WorldWind.ShapeAttributes(null);
        polygonAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.75);
        polygonAttributes.outlineColor = WorldWind.Color.BLUE;
        polygonAttributes.drawOutline = true;
        polygonAttributes.applyLighting = true;

        const boundaries = [];
        boundaries.push(new WorldWind.Position(20.0, -75.0, 700000.0));
        boundaries.push(new WorldWind.Position(25.0, -85.0, 700000.0));
        boundaries.push(new WorldWind.Position(20.0, -95.0, 700000.0));

        const polygon = new WorldWind.Polygon(boundaries, polygonAttributes);
        polygon.extrude = true;
        polygonLayer.addRenderable(polygon);
    }

    const threeDimSatTest = () => {
        const modelLayer = new WorldWind.RenderableLayer();
        wwd.addLayer(modelLayer);

        // Position takes the following position arguments: lat, lon, altitude
        const position = new WorldWind.Position(-51.151321133767, -6.0196159367604, 800000.0);
        const config = {dirPath: WorldWind.configuration.baseUrl};
        const colladaLoader = new WorldWind.ColladaLoader(position, config);

        colladaLoader.load('satellite.dae', function (colladaModel) {
            colladaModel.scale = 1500;
            modelLayer.addRenderable(colladaModel);
        })
    }

    useEffect(() => {
        setWWD(new WorldWind.WorldWindow('canvasOne'));
    }, [])

    useEffect(() => {
        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        if (wwd) {
            //* needs useCallback, if implemented this way
            // threeDimSatTest();
            // threeDimTest();

            // Create the WorldWindow.
            // Create imagery layers.
            // const BMNGOneImageLayer = new WorldWind.BMNGOneImageLayer("https://github.com/NASAWorldWind/WebWorldWind/blob/develop/images/BMNG_world.topo.bathy.200405.3.2048x1024.jpg");
            const BMNGOneImageLayer = new WorldWind.BMNGOneImageLayer();
            const BMNGLayer = new WorldWind.BMNGLayer();
            wwd.addLayer(BMNGOneImageLayer);
            wwd.addLayer(BMNGLayer);

            // Use the StarField layer to show stars and the Sun around the globe, and the Atmosphere layer to display
            // the atmosphere effect and the night side of the Earth.
            // Note that the StarField layer requires a dark canvas background color.
            // The StarField layer should be added before the Atmosphere layer.
            // const starFieldLayer = new WorldWind.StarFieldLayer();
            const atmosphereLayer = new WorldWind.AtmosphereLayer("https://unpkg.com/worldwindjs@1.7.0/build/dist/images/dnb_land_ocean_ice_2012.png");
            // wwd.addLayer(starFieldLayer);
            wwd.addLayer(atmosphereLayer);

            // Set a date property for the StarField and Atmosphere layers to the current date and time.
            // This enables the Atmosphere layer to show a night side (and dusk/dawn effects in Earth's terminator).
            // The StarField layer positions its stars according to this date.
            const now = new Date();
            // starFieldLayer.time = now;
            atmosphereLayer.time = now;

            // In this example, each full day/night cycle lasts 8 seconds in real time.
            const simulatedMillisPerDay = 8000;

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
                // starFieldLayer.time = simulatedDate;
                atmosphereLayer.time = simulatedDate;
                wwd.redraw(); // Update the WorldWindow scene.

                requestAnimationFrame(runSimulation);
            }

            // Animate the starry sky as well as the globe's day/night cycle.
            requestAnimationFrame(runSimulation);

            // Create a layer manager for controlling layer visibility.
            // const layerManager = new LayerManager(wwd);
        }
    }, [wwd]);
    const { width, height } = useViewport();

    return (
        <canvas
            id="canvasOne"
            width={width}
            height={height}
            style={{width: width, height: height, ...customAttributes}}
        >
        </canvas>
    )

}

export default EarthCanvas;
