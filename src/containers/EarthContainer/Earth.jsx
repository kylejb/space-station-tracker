import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { useViewport, useSearchContext } from 'common/hooks';
import { FETCH_SUCCESS } from 'utils/constants';
import './style.scss';

const Earth = () => {
    const globeEl = useRef();
    const [satelliteCollection, setSatelliteCollection] = useState([]);
    const [followISS, setFollowISS] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const { searchResult } = useSearchContext();

    // Camera follows ISS on state change
    useEffect(() => {
        if (followISS && satelliteCollection.length) {
            globeEl.current.controls().autoRotate = false;

            globeEl.current.pointOfView({
                lat: satelliteCollection[0].latitude,
                lng: satelliteCollection[0].longitude,
                altitude: 2,
            });
        } else if (searchResult.status === FETCH_SUCCESS) {
            globeEl.current.controls().autoRotate = false;
        } else {
            globeEl.current.controls().autoRotate = true;
        }
    }, [followISS, satelliteCollection, searchResult]);

    useEffect(() => {
        if (searchResult.status === FETCH_SUCCESS) {
            setFollowISS(false);
            globeEl.current.controls().autoRotate = false;
            globeEl.current.pointOfView({
                lat: searchResult.value[0].lat,
                lng: searchResult.value[0].lon,
                altitude: 1.9,
            });
        }
    }, [searchResult]);

    useEffect(() => {
        // ISS Satellite ID is 25544 at this endpoint
        const findISS = async () => {
            const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
            let data = await response.json();
            setSatelliteCollection([data]);
            if (isFirstLoad) {
                globeEl.current.pointOfView({
                    lat: data.latitude,
                    lng: data.longitude,
                    altitude: 2,
                });
                setIsFirstLoad(false);
            }
        };

        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.1;

        const interval = setInterval(() => {
            findISS();
        }, 3000);

        return () => clearInterval(interval);
    }, [isFirstLoad]);

    const { width, height } = useViewport();

    return (
        <div className='earth-container'>
            <h1>Space Station Tracker</h1>
            <span>
                <input
                    aria-label='Toggle to follow ISS'
                    type='checkbox'
                    value={followISS}
                    checked={followISS}
                    onChange={() => setFollowISS(!followISS)}
                />
                <label aria-label='Follow ISS'>Follow Station</label>
            </span>
            <Globe
                ref={globeEl}
                width={width}
                height={height}
                globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
                bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
                backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
                customLayerData={satelliteCollection}
                customLayerLabel='ISS'
                customThreeObject={(d) =>
                    new THREE.Mesh(
                        new THREE.SphereBufferGeometry(8000 * 4e-4),
                        new THREE.MeshLambertMaterial({
                            wireframe: true,
                            combine: THREE.MultiplyOperation,
                            reflectivity: 0.3,
                        }),
                    )
                }
                customThreeObjectUpdate={(obj, d) => {
                    Object.assign(
                        obj.position,
                        globeEl.current.getCoords(d.latitude, d.longitude, 0.3),
                    );
                }}
                labelsData={searchResult.value}
                labelLat={(d) => d.lat}
                labelLng={(d) => d.lon}
                labelText={(d) => ''}
                labelSize={1000 * 4e-4}
                labelDotRadius={2000 * 4e-4}
                labelColor={() => '#c43335'}
                labelResolution={3}
            />
        </div>
    );
};

export default Earth;
