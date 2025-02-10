/* eslint-disable id-length */
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

interface IArcPath {
    x: number;
    y: number;
    R: number;
    r: number;
    start: number;
    end: number;
}

function getArcPathObj(entryDir: string, exitDir: string): IArcPath {
    const entryDeg: number = cardinalToDeg[entryDir];
    const exitDeg: number = cardinalToDeg[exitDir];

    if (entryDeg > exitDeg) {
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
        return startEndDelta > 180
            ? {
                  x: 304,
                  y: 304,
                  R: 180,
                  r: 180,
                  start: entryDeg,
                  end: exitDeg,
              }
            : {
                  x: 304,
                  y: 304,
                  R: 180,
                  r: 180,
                  start: exitDeg,
                  end: entryDeg,
              };
    }
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
    }
    return endStartDelta > 180
        ? {
              x: 304,
              y: 304,
              R: 180,
              r: 180,
              start: exitDeg,
              end: entryDeg,
          }
        : {
              x: 304,
              y: 304,
              R: 180,
              r: 180,
              start: entryDeg,
              end: exitDeg,
          };
}

export function drawViewingArea(entryDir: string, exitDir: string): string {
    const spaceStationPath: string = arc(getArcPathObj(entryDir, exitDir));
    if (Math.abs(cardinalToDeg[entryDir] - cardinalToDeg[exitDir]) === 180) {
        return spaceStationPath.replace(/A 180/g, 'A 0');
    }
    return spaceStationPath;
}
