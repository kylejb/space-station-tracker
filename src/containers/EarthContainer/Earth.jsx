import { useEffect, useRef, useState } from 'react';
import { FETCH_SUCCESS, FETCH_FAIL, SEARCH_RESET } from 'utils/constants';
import useViewport from 'hooks/useViewport';
import * as solar from 'solar-calculator';
import * as THREE from 'three';
import Globe from 'react-globe.gl';
import './style.scss';

const Earth = (props) => {
    const globeEl = useRef();
    const [satelliteCollection, setSatelliteCollection] = useState([]);
    const [followISS, setFollowISS] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    // Camera follows ISS on state change
    useEffect(() => {
        if (followISS && satelliteCollection.length) {
            globeEl.current.controls().autoRotate = false;

            globeEl.current.pointOfView({
                lat: satelliteCollection[0].latitude,
                lng: satelliteCollection[0].longitude,
                altitude: 2
            });
        } else if (props.searchResult.status === FETCH_SUCCESS) {
            globeEl.current.controls().autoRotate = false;
        } else {
            globeEl.current.controls().autoRotate = true;
        }

    }, [followISS, satelliteCollection, props.searchResult]);


    useEffect(() => {
        if (props.searchResult.status === FETCH_SUCCESS) {
            setFollowISS(false);
            globeEl.current.controls().autoRotate = false;
            globeEl.current.pointOfView({
                lat: props.searchResult.value[0].lat,
                lng: props.searchResult.value[0].lon,
                altitude: 2
            });
        }
    }, [props.searchResult]);

    //! Fix behavior during re-render
    // const globeMaterial = new THREE.MeshPhongMaterial();
    // globeMaterial.bumpScale = 10;
    // new THREE.TextureLoader().load(
    //     '//unpkg.com/three-globe/example/img/earth-water.png',
    //     texture => {
    //         globeMaterial.specularMap = texture;
    //         globeMaterial.specular = new THREE.Color('grey');
    //         globeMaterial.shininess = 15;
    //     }
    // );

    const [dt, setDt] = useState(+new Date());

    const VELOCITY = 0; // minutes per frame

    const solarMaterial = new THREE.MeshLambertMaterial({ color: '#2e2e29', opacity: 0.3, transparent: true });

    const sunPosAt = dt => {
        const day = new Date(+dt).setUTCHours(0, 0, 0, 0);
        const t = solar.century(dt);
        const longitude = (day - dt) / 864e5 * 360 - 180;
        return [longitude - solar.equationOfTime(t) / 4, solar.declination(t)];
    };


    useEffect(() => {
        setTimeout(() => { // wait for scene to be populated (asynchronously)
            const directionalLight = globeEl.current.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
            directionalLight && directionalLight.position.set(0, 1, 0); // change light position to see the specularMap's effect
        });

        // ISS Satellite ID is 25544 at this endpoint
        const findISS = async () => {
            const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
            let data = await response.json();
            setSatelliteCollection([data]);
            if (isFirstLoad) {
                globeEl.current.pointOfView({
                    lat: data.latitude,
                    lng: data.longitude,
                    altitude: 2
                });
                setIsFirstLoad(false);
            }
        }

        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.1;

        const interval = setInterval(() => {
            findISS();
        }, 2000);
        const iterateTime = () => {
            setDt(dt => dt + VELOCITY * 60 * 1000);
            globeEl.current.iterateTime = requestAnimationFrame(iterateTime);
        }

        globeEl.current = requestAnimationFrame(iterateTime);

        return () => {
            cancelAnimationFrame(globeEl.current.iterateTime);
            clearInterval(interval);
        }
    }, [isFirstLoad]);

    // Resets width and height of earth component based on size of viewport
    const { width, height } = useViewport();

    const getAntipodeLat = lat => {
        return lat * -1;
    }

    const getAntipodeLng = lng => {
        return lng > 0 ? lng - 180 : lng + 180;
    }

    // console.log("globeisrendering", globeEl)

    return (
        <div className="earth-container">
            <h1>Where iss the ISS?</h1>
            <span>
                <input
                    aria-label="Toggle to follow ISS"
                    type="checkbox"
                    value={followISS}
                    checked={followISS}
                    onChange={() => setFollowISS(!followISS)}
                />
                <label aria-label="Follow ISS">Follow Station</label>
            </span>
            <Globe
                ref={globeEl}
                width={width}
                height={height}

                tilesData={[{ pos: sunPosAt(dt) }]}
                tileLng={d => getAntipodeLng(d.pos[0])}
                tileLat={d => getAntipodeLat(d.pos[1])}
                tileAltitude={0.005}
                tileWidth={180}
                tileHeight={180}
                tileUseGlobeProjection={false}
                tileMaterial={() => solarMaterial}
                tilesTransitionDuration={0}

                // globeMaterial={globeMaterial}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

                customLayerData={satelliteCollection}
                customThreeObject={d => new THREE.Mesh(
                    new THREE.SphereBufferGeometry(4000 * 4e-4),
                    new THREE.MeshLambertMaterial({ color: "white" }),
                )}
                customThreeObjectUpdate={(obj, d) => {
                    Object.assign(obj.position, globeEl.current.getCoords(d.latitude, d.longitude, 0.4));
                }}

                labelsData={props.searchResult.value}
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
