import { useEffect, useState } from "react";
import Globe from "common/components/globe";
import WorldWind from "worldwindjs";
import "./style.scss";

const EarthContainer = (props) => {
  const [satelliteCollection, setSatelliteCollection] = useState([]);

  useEffect(() => {
    // ISS Satellite ID is 25544 at this endpoint
    const findISS = async () => {
      const response = await fetch(
        "https://api.wheretheiss.at/v1/satellites/25544"
      );
      let data = await response.json();
      setSatelliteCollection([data]);
    };
    const interval = setInterval(() => {
      findISS();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  //! Experimental - for testing/development of Canvas component and api/Globe
  useEffect(() => {
    // Create a globe
    let globe = new Globe("globe-canvas");

    // Add layers to the globe
    globe.addLayer(new WorldWind.BMNGLayer(), {
      category: "base",
    });
    // globe.addLayer(new WorldWind.CoordinatesDisplayLayer(globe.wwd), {
    //     category: "setting"
    // });
    // globe.addLayer(new WorldWind.ViewControlsLayer(globe.wwd), {
    //     category: "setting"
    // });
    // globe.addLayer(new WorldWind.CompassLayer(), {
    //     category: "setting",
    // });
  }, []);

  return (
    <div className="earth-container">
      <h1>Where iss the ISS?</h1>
      <span>
        <input
          aria-label="Toggle to follow ISS"
          type="checkbox"
          // value={followISS}
          // checked={followISS}
          // onChange={() => setFollowISS(!followISS)}
        />
        <label aria-label="Follow ISS">Follow Station</label>
      </span>
    </div>
  );
};

export default EarthContainer;
