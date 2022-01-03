import arc from 'svg-arc';

const cardinalToDeg = {
    N: 0.0,
    NNE: 22.5,
    NE: 45.0,
    ENE: 67.5,
    E: 90.0,
    ESE: 112.5,
    SE: 135.0,
    SSE: 157.5,
    S: 180.0,
    SSW: 202.5,
    SW: 225.0,
    WSW: 247.5,
    W: 270.0,
    WNW: 292.5,
    NW: 315.0,
    NNW: 337.5,
};

const DEFAULT_RANGE_WHEN_ENTRY_EQUALS_EXIT = 5;

const getArcPathObj = (entryDir, exitDir) => {
    const entryDeg = cardinalToDeg[entryDir];
    const exitDeg = cardinalToDeg[exitDir];

    switch (entryDeg > exitDeg) {
        case true:
            const startEndDelta = entryDeg - exitDeg;
            if (startEndDelta === 180) {
                return {
                    x: 304,
                    y: 304,
                    R: 180,
                    r: 180,
                    start: entryDeg,
                    end: exitDeg,
                };
            }
            if (startEndDelta > 180) {
                return {
                    x: 304,
                    y: 304,
                    R: 180,
                    r: 180,
                    start: entryDeg,
                    end: exitDeg,
                };
            } else {
                return {
                    x: 304,
                    y: 304,
                    R: 180,
                    r: 180,
                    start: exitDeg,
                    end: entryDeg,
                };
            }

        case false:
            const endStartDelta = exitDeg - entryDeg;
            if (endStartDelta === 0) {
                return {
                    x: 304,
                    y: 304,
                    R: 180,
                    r: 180,
                    start: exitDeg - DEFAULT_RANGE_WHEN_ENTRY_EQUALS_EXIT,
                    end: entryDeg + DEFAULT_RANGE_WHEN_ENTRY_EQUALS_EXIT,
                };
            } else if (endStartDelta > 180) {
                return {
                    x: 304,
                    y: 304,
                    R: 180,
                    r: 180,
                    start: exitDeg,
                    end: entryDeg,
                };
            } else {
                return {
                    x: 304,
                    y: 304,
                    R: 180,
                    r: 180,
                    start: entryDeg,
                    end: exitDeg,
                };
            }
        default:
            return {
                x: 304,
                y: 304,
                R: 180,
                r: 180,
                start: entryDeg,
                end: exitDeg,
            };
    }
};

export const drawViewingArea = (entryDir, exitDir) => {
    const spaceStationPath = arc(getArcPathObj(entryDir, exitDir));
    if (Math.abs(cardinalToDeg[entryDir] - cardinalToDeg[exitDir]) === 180) {
        return spaceStationPath.replace(/A 180/g, 'A 0');
    }
    return spaceStationPath;
};
