import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';


const Earth = () => {
  const [stationLocation, setStationLocation] = useState([]);
  const globeEl = useRef();


  useEffect(()=> {
    //! For illustrative/testing purposes (not for production)
    setStationLocation([{ name: "ISS", coordinates: ["12.25958", "16.03003"] }]);
  }, [])


  return (
    <>
      <h1>Globe Component</h1>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        labelsData={stationLocation}
        labelLat={d => d.coordinates[1]}
        labelLng={d => d.coordinates[0]}
        labelText={d => d.name}
        labelSize={1000 * 4e-4}
        labelDotRadius={1400 * 4e-4}
        labelColor={() => 'rgba(255, 30, 0, 0.75)'}
        labelResolution={2}
      />
    </>
  );
};

export default Earth;
