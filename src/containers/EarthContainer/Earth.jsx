import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';


const Earth = ( props ) => {
  const globeEl = useRef();
  // react-globe expects stationObj to be iterable
  const [stationObj, setStationObj] = useState([]);
  const [followISS, setFollowISS] = useState(false);


  useEffect(()=> {
    // ISS Satellite ID is 25544 at this endpoint
    const findISS = async () => {
      const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
      let data = await response.json();
      setStationObj([ data ]);
    }
    const interval = setInterval(() => {
      findISS();
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  // Camera follows ISS on state change
  useEffect(() => {
    if ( followISS && stationObj.length ) {
      globeEl.current.controls().autoRotate = false;

      globeEl.current.pointOfView({
        lat: stationObj[0].latitude,
        lng: stationObj[0].longitude,
        altitude: 2
      });
    }
  }, [followISS, stationObj]);

  // Default view
   useEffect(() => {
    globeEl.current.pointOfView({
      lat: 39.9,
      lng: -97.8,
      altitude: 2
    });
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.1;
  }, []);

  useEffect(() => {
    if ( props.searchResult.length ) {
      setFollowISS(false);
      globeEl.current.controls().autoRotate = false;
      globeEl.current.pointOfView({
        lat: props.searchResult[0].lat,
        lng: props.searchResult[0].lon,
        altitude: 2
      });
    }

  }, [props.searchResult]);


  return (
    <>
      <h1>Earth Component</h1>
      <label aria-label="Follow ISS">Follow ISS</label>
      <input
        aria-label="Toggle to follow ISS"
        type="checkbox"
        value={followISS}
        checked={followISS}
        onChange={() => setFollowISS(!followISS)}
      />
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        pointsData={stationObj}
        pointLat={d => d.latitude}
        pointLng={d => d.longitude}
        pointLabel={d => "ISS"}
        pointAltitude={0.9}
        pointRadius={0.25}
        pointsMerge={true}
        pointColor={() => 'red'}
        pointResolution={12}

        labelsData={props.searchResult}
        labelLat={d => d.lat}
        labelLng={d => d.lon}
        labelText={d => "Postcode"}
        labelSize={1000 * 4e-4}
        labelDotRadius={1400 * 4e-4}
        labelColor={() => 'teal'}
        labelResolution={2}
      />
    </>
  );
};

export default Earth;
