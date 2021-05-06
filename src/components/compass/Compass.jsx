import arc from 'svg-arc';
import './style.scss'

const Compass = (props) => {

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
    const getArcPathObj = () => {
        switch (cardinalToDeg[props.entersSky] > cardinalToDeg[props.leavesSky]) {
            case true:
                const startEndDelta = cardinalToDeg[props.entersSky] - cardinalToDeg[props.leavesSky];

                if (startEndDelta > 180) {
                    return {
                        x: 304,
                        y: 304,
                        R: 180,
                        r: 180,
                        start: cardinalToDeg[props.entersSky],
                        end: cardinalToDeg[props.leavesSky],
                    };
                } else {
                    return {
                        x: 304,
                        y: 304,
                        R: 180,
                        r: 180,
                        start: cardinalToDeg[props.leavesSky],
                        end: cardinalToDeg[props.entersSky],
                    };
                }

            case false:
                const endStartDelta = cardinalToDeg[props.leavesSky] - cardinalToDeg[props.entersSky];
                if (endStartDelta > 180) {
                    return {
                        x: 304,
                        y: 304,
                        R: 180,
                        r: 180,
                        start: cardinalToDeg[props.leavesSky],
                        end: cardinalToDeg[props.entersSky],
                    };
                } else {
                    return {
                        x: 304,
                        y: 304,
                        R: 180,
                        r: 180,
                        start: cardinalToDeg[props.entersSky],
                        end: cardinalToDeg[props.leavesSky],
                    };
                }
            default:
                return {
                    x: 304,
                    y: 304,
                    R: 180,
                    r: 180,
                    start: cardinalToDeg[props.entersSky],
                    end: cardinalToDeg[props.leavesSky],
                };
        }

    }

    // library helper
    const arcAttributes = arc(getArcPathObj());

    // Will need to avg the start and end points and then create a new "arc of 1 degree"
    const arcMidpoint = arc({
        x: 304,
        y: 304,
        R: 180,
        r: 180,
        start: 150,
        end: 151,
    })

    // // When drawing a annulus, the attribute value of 'fill-rule' must be set to 'evenodd', otherwise the color cannot be filled correctly.
    //     path.setAttribute('fill-rule', 'evenodd');

    return (
        <svg width="100%" viewBox="0 0 608 608">
            <g>
                {/* X and y Axis for compass */}
                <line x1="304" x2="304" y1="64" y2="544" strokeWidth="2" stroke="#FFFFFF"></line>
                <line x1="64" x2="544" y1="304" y2="304" strokeWidth="2" stroke="#FFFFFF"></line>

                {/* Circle guide - will be transparrent */}
                <circle cx="304" cy="304" r="180" fill="transparent" strokeWidth="2" stroke="#FFFFFF"></circle>

                {/* Directions */}
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="middle" transform="translate(304, 60)">N</text>
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(433.6, 175.6)">NE</text>
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="start" alignmentBaseline="middle" transform="translate(548, 307)">E</text>
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(443.6, 443.6)">SE</text>
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="middle" transform="translate(304, 572)">S</text>
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(113.6, 443.6)">SW</text>
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="end" alignmentBaseline="middle" transform="translate(62, 307)">W</text>
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(113.6, 180.6)">NW</text>

                {/* Arrow head - find better solution later */}
                {/* <defs>
                    <marker id="arrowhead" fill="#4287f5" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 2.5 3.5, 0 7" />
                    </marker>
                </defs> */}

                {/* Curve that we'll need to render dynamically */}
                <path fill="transparent" strokeWidth="4" stroke="#4287f5" d={arcAttributes} markerStart="url(#arrowhead)"/>
                {/* <path fill="transparent" strokeWidth="8" stroke="#ff0000" d={arcMidpoint} /> */}

            </g>
            {/* <g>
                <text fill="#ffffff" fontSize="12" transform="translate(449.92, 564)">Color denotes wave period</text><text fill="#ffffff" fontSize="12" transform="translate(355.67999999999995, 583)">Wave Direction (°) vs Wave Energy (m^2Hz)</text>
            </g> */}

        </svg>
    );
}


export default Compass
