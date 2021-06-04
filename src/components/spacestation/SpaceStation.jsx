import { useState, useEffect } from 'react';

const SpaceStation = () => {
    // react-globe expects stationObj to be iterable
    const [stationObj, setStationObj] = useState([]);

    useEffect(() => {
        // ISS Satellite ID is 25544 at this endpoint
        const findISS = async () => {
            const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
            let data = await response.json();
            setStationObj([data]);
        };
        const interval = setInterval(() => {
            findISS();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return <h1>SpaceStation Component</h1>;
};

export default SpaceStation;
