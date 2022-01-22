import { useSearchContext, useViewport } from 'common/hooks';
import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { FETCH_SUCCESS } from 'utils/constants';

const Earth = () => {
    // TODO: Replace 'any's with type defs
    const globeEl = useRef<any>(null); // should probably incorporate GlobeMethods
    const [satelliteCollection, setSatelliteCollection] = useState<any>([]);
    const [followISS, setFollowISS] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const { value, status } = useSearchContext();

    // Camera follows ISS on state change
    useEffect(() => {
        if (followISS && satelliteCollection.length && globeEl.current) {
            globeEl.current.controls().autoRotate = false;

            globeEl.current.pointOfView({
                lat: satelliteCollection[0].latitude,
                lng: satelliteCollection[0].longitude,
                altitude: 2,
            });
        } else if (status === FETCH_SUCCESS) {
            globeEl.current.controls().autoRotate = false;
        } else {
            globeEl.current.controls().autoRotate = true;
        }
    }, [followISS, satelliteCollection, status]);

    useEffect(() => {
        if (status === FETCH_SUCCESS) {
            setFollowISS(false);
            globeEl.current.controls().autoRotate = false;
            globeEl.current.pointOfView({
                lat: value[0].lat,
                lng: value[0].lon,
                altitude: 1.9,
            });
        }
    }, [status, value]);

    useEffect(() => {
        // ISS Satellite ID is 25544 at this endpoint
        const findISS = async () => {
            const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
            const data = await response.json();
            data.name = 'ISS';
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

        if (isFirstLoad) {
            findISS();
        }

        const interval = setInterval(() => {
            findISS();
        }, 5000);

        return () => clearInterval(interval);
    }, [isFirstLoad]);

    const { width, height } = useViewport();

    return (
        <div className='absolute cursor-grab active:cursor-grabbing'>
            <h1 className='fixed z-10 top-12 left-12 font-garet text-stone-50 tracking-widest text-4xl'>
                Space Station Tracker
            </h1>
            <span className='fixed bottom-6 left-[45%] z-10'>
                <input
                    id='follow-iss'
                    aria-label='Toggle to follow ISS'
                    type='checkbox'
                    value={String(followISS)}
                    checked={followISS}
                    onChange={() => setFollowISS(!followISS)}
                />
                <label
                    className='font-basier text-stone-50 text-lg ml-2'
                    aria-label='Follow ISS'
                    htmlFor='follow-iss'
                >
                    Follow Station
                </label>
            </span>
            <Globe
                ref={globeEl}
                width={width}
                height={height}
                globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
                bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
                backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
                customLayerData={satelliteCollection}
                // customLayerLabel='ISS' // -- Enabling this removes ISS hover label
                customThreeObject={() =>
                    new THREE.Mesh(
                        new THREE.SphereBufferGeometry(8000 * 4e-4),
                        new THREE.MeshLambertMaterial({
                            wireframe: true,
                            combine: THREE.MultiplyOperation,
                            reflectivity: 0.3,
                            color: '#c43335',
                        }),
                    )
                }
                customThreeObjectUpdate={(obj, d: any) => {
                    Object.assign(
                        obj.position,
                        globeEl.current.getCoords(d.latitude, d.longitude, 0.3),
                    );
                }}
                labelsData={value}
                labelLat={(d: any) => d.lat}
                labelLng={(d: any) => d.lon}
                labelText={() => ''} // optional label for searched sighting location
                labelSize={1000 * 4e-4}
                labelDotRadius={1500 * 4e-4}
                labelColor={() => '#c43335'}
                labelResolution={3}
            />
        </div>
    );
};

export default Earth;
