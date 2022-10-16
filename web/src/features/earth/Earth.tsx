import { useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

import useFollowSpaceStation from 'features/earth/hooks/useFollowSpaceStation';

import useViewport from './hooks/useViewport';

function Earth(): JSX.Element {
    // TODO: Replace 'any's with type defs
    const globeEl = useRef<any>(null); // should probably incorporate GlobeMethods
    const { followISS, satellites, value, setFollowISS } = useFollowSpaceStation(globeEl);
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
                globeImageUrl='/images/earth-blue-marble.jpg'
                bumpImageUrl='/images/earth-topology.png'
                backgroundImageUrl='/images/night-sky.png'
                customLayerData={satellites}
                customThreeObject={() =>
                    new THREE.Mesh(
                        new THREE.SphereGeometry(8000 * 4e-4),
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
                labelText={() => ''}
                labelSize={1000 * 4e-4}
                labelDotRadius={1500 * 4e-4}
                labelColor={() => '#c43335'}
                labelResolution={3}
            />
        </div>
    );
}

export default Earth;
