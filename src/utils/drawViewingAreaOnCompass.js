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

/*
    ! TEMP - Missing edge case: entersSky + leavesSky === 180
        ? take into account maxElev, if drawing line when maxElev !== 90
*/
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
            if (endStartDelta > 180) {
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
}


export const drawViewingArea = (entryDir, exitDir) => {
    return getArcPathObj(entryDir, exitDir);
}
