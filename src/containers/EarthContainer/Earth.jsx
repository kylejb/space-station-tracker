import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';


const Earth = ( props ) => {
  const globeEl = useRef();
  // react-globe expects stationObj to be iterable
  const [stationObj, setStationObj] = useState([]);


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
  // useEffect(() => {
  //   if (stationObj.length) {
  //     globeEl.current.pointOfView({
  //       lat: stationObj[0].latitude,
  //       lng: stationObj[0].longitude,
  //       altitude: 2
  //     });
  //   }
  // }, [stationObj]);

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


  return (
    <>
      <h1>Earth Component</h1>
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
