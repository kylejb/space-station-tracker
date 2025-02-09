import { type JSX, useEffect, useRef, useState } from 'react';
import Globe, { type GlobeMethods } from 'react-globe.gl';
import { Mesh, MeshLambertMaterial, MultiplyOperation, SphereGeometry } from 'three';

import { FETCH_SUCCESS } from '@common/constants';
import { useSearchContext, useViewport } from '@common/hooks';

interface ISSData {
    name: string;
    id: number;
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
    visibility: string;
    footprint: number;
    timestamp: number;
    daynum: number;
    solar_lat: number;
    solar_lon: number;
    units: string;
}

interface GlobeISSLabel {
    lat: number;
    lon: number;
}

function Earth(): JSX.Element {
    // TODO: Replace 'any's with type defs
    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const [satelliteCollection, setSatelliteCollection] = useState<ISSData[]>([]);
    const [followISS, setFollowISS] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const { value, status } = useSearchContext();

    useEffect(() => {
        if (globeEl.current && followISS && satelliteCollection.length) {
            globeEl.current.controls().autoRotate = false;

            globeEl.current.pointOfView({
                lat: satelliteCollection[0].latitude,
                lng: satelliteCollection[0].longitude,
                altitude: 2,
            });
        } else if (status === FETCH_SUCCESS && globeEl.current) {
            globeEl.current.controls().autoRotate = false;
        } else if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
        }
    }, [followISS, satelliteCollection, status]);

    useEffect(() => {
        if (globeEl.current && status === FETCH_SUCCESS) {
            setFollowISS(false);
            globeEl.current.controls().autoRotate = false;
            globeEl.current.pointOfView({
                lat: Number(value[0].lat),
                lng: Number(value[0].lon),
                altitude: 1.9,
            });
        }
    }, [status, value]);

    useEffect(() => {
        const findISS = async () => {
            const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
            const data = (await response.json()) as ISSData;
            data.name = 'ISS';
            setSatelliteCollection([data]);
            if (globeEl.current && isFirstLoad) {
                globeEl.current.pointOfView({
                    lat: data.latitude,
                    lng: data.longitude,
                    altitude: 2,
                });
                setIsFirstLoad(false);
            }
        };
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.1;
        }

        if (isFirstLoad) {
            findISS().catch((error) => {
                // eslint-disable-next-line no-console
                console.error('Error fetching ISS data:', error);
            });
        }

        const interval = setInterval(() => {
            findISS().catch((error) => {
                // eslint-disable-next-line no-console
                console.error('Error fetching ISS data:', error);
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [isFirstLoad]);

    const { width, height } = useViewport();

    return (
        <div className="absolute cursor-grab active:cursor-grabbing">
            <h1 className="fixed z-10 top-12 left-12 font-garet text-stone-50 tracking-widest text-4xl">
                Space Station Tracker
            </h1>
            <span className="fixed bottom-6 left-[45%] z-10">
                <label
                    className="font-basier text-stone-50 text-lg ml-2"
                    aria-label="Follow ISS"
                    htmlFor="follow-iss"
                >
                    <input
                        id="follow-iss"
                        aria-label="Toggle to follow ISS"
                        type="checkbox"
                        value={String(followISS)}
                        checked={followISS}
                        onChange={() => setFollowISS(!followISS)}
                    />
                    Follow Station
                </label>
            </span>
            <Globe
                ref={globeEl}
                width={width}
                height={height}
                globeImageUrl="/images/earth-blue-marble.jpg"
                bumpImageUrl="/images/earth-topology.png"
                backgroundImageUrl="/images/night-sky.png"
                customLayerData={satelliteCollection}
                customThreeObject={() =>
                    new Mesh(
                        new SphereGeometry(8000 * 4e-4),
                        new MeshLambertMaterial({
                            wireframe: true,
                            combine: MultiplyOperation,
                            reflectivity: 0.3,
                            color: '#c43335',
                        }),
                    )
                }
                customThreeObjectUpdate={(obj, coords) => {
                    Object.assign(
                        obj.position,
                        globeEl.current
                            ? globeEl.current.getCoords(
                                  (coords as ISSData).latitude,
                                  (coords as ISSData).longitude,
                                  0.3,
                              )
                            : undefined,
                    );
                }}
                labelsData={value}
                labelLat={(coords) => (coords as GlobeISSLabel).lat}
                labelLng={(coords) => (coords as GlobeISSLabel).lon}
                labelText=""
                labelSize={1000 * 4e-4}
                labelDotRadius={1500 * 4e-4}
                labelColor="#c43335"
                labelResolution={3}
            />
        </div>
    );
}

export default Earth;
