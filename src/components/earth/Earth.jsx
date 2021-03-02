import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';


const Earth = ( props ) => {
  // react-globe expects stationObj to be iterable
  const [stationObj, setStationObj] = useState([]);
  const globeEl = useRef();


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
    globeEl.current.pointOfView({
      lat: stationObj[0].latitude,
      lng: stationObj[0].longitude,
      altitude: 2
    });
  }, [stationObj]);


  return (
    <>
      <h1>Earth Component</h1>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        labelsData={stationObj}
        labelLat={d => d.latitude}
        labelLng={d => d.longitude}
        labelText={d => "ISS"}
        labelSize={1000 * 4e-4}
        labelDotRadius={1400 * 4e-4}
        labelColor={() => 'rgba(255, 30, 0, 0.75)'}
        labelResolution={2}
      />
    </>
  );
};

export default Earth;
