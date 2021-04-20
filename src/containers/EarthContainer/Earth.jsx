import { useEffect, useRef, useState } from 'react';
import useViewport from 'hooks/useViewport';
import * as THREE from 'three';
import Globe from 'react-globe.gl';
import "./style.scss"


const Earth = ( props ) => {
  const globeEl = useRef();
  const [satelliteCollection, setSatelliteCollection] = useState([]);
  const [followISS, setFollowISS] = useState(false);


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


  // Camera follows ISS on state change
  useEffect(() => {
    if ( followISS && satelliteCollection.length ) {
      globeEl.current.controls().autoRotate = false;

      globeEl.current.pointOfView({
        lat: satelliteCollection[0].latitude,
        lng: satelliteCollection[0].longitude,
        altitude: 2
      });
    }
  }, [followISS, satelliteCollection]);

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

  const { width, height } = useViewport();


  return (
    <div className="earth-container">
      {/* <h1>Earth Component</h1> */}
      {/* <label aria-label="Follow ISS">Follow ISS</label>
      <input
        aria-label="Toggle to follow ISS"
        type="checkbox"
        value={followISS}
        checked={followISS}
        onChange={() => setFollowISS(!followISS)}
      /> */}
      <Globe
        ref={globeEl}
        width={width}
        height={height}

        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

        customLayerData={satelliteCollection}
        customThreeObject={d => new THREE.Mesh(
            new THREE.SphereBufferGeometry(4000 * 4e-4),
            new THREE.MeshLambertMaterial({ color: "white" })
        )}
        customThreeObjectUpdate={(obj, d) => {
            Object.assign(obj.position, globeEl.current.getCoords(d.latitude, d.longitude, 0.4));
        }}

        labelsData={props.searchResult}
        labelLat={d => d.lat}
        labelLng={d => d.lon}
        labelText={d => "Postcode"}
        labelSize={1000 * 4e-4}
        labelDotRadius={1000 * 4e-4}
        labelColor={() => 'teal'}
        labelResolution={2}
      />
    </div>
  );
};

export default Earth;
