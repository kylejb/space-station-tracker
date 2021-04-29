import { useEffect, useState } from 'react';
import EarthCanvas from 'components/earth';
import useViewport from 'hooks/useViewport';
import './style.scss';

const Earth = ( props ) => {
  const [satelliteCollection, setSatelliteCollection] = useState([]);


  useEffect(()=> {
    // ISS Satellite ID is 25544 at this endpoint
    const findISS = async () => {
      const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
      let data = await response.json();
      setSatelliteCollection([ data ]);
    }
    const interval = setInterval(() => {
      findISS();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { width, height } = useViewport();

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
            <EarthCanvas
                width={width}
                height={height}
                satelliteCollection={satelliteCollection}
            />
        </div>
    );
};

export default Earth;
