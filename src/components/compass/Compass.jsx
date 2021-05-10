import { drawViewingArea } from 'utils/drawViewingAreaOnCompass';
import arc from 'svg-arc';
import './style.scss';

const Compass = ({ entersSky, leavesSky }) => {


    return (
        <svg width="100%" viewBox="0 0 608 608">
            <g>
                {/* X and y Axis for compass */}
                <line x1="304" x2="304" y1="64" y2="544" strokeWidth="2" stroke="#FFFFFF" opacity="0.4"></line>
                <line x1="64" x2="544" y1="304" y2="304" strokeWidth="2" stroke="#FFFFFF" opacity="0.4"></line>

                {/* Circle guide - will be transparrent */}
                <circle cx="304" cy="304" r="180" fill="transparent" strokeWidth="2" stroke="#FFFFFF" opacity="0.4"></circle>

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
                <path
                    d={arc(drawViewingArea(entersSky, leavesSky))}
                    fill="transparent"
                    strokeWidth="6"
                    stroke="#4287f5"
                    markerStart="url(#arrowhead)"
                />
                {/* <path fill="transparent" strokeWidth="8" stroke="#ff0000" d={arcMidpoint} /> */}

            </g>
            {/* <g>
                <text fill="#ffffff" fontSize="12" transform="translate(449.92, 564)">Color denotes wave period</text><text fill="#ffffff" fontSize="12" transform="translate(355.67999999999995, 583)">Wave Direction (°) vs Wave Energy (m^2Hz)</text>
            </g> */}

        </svg>
    );
}


export default Compass;
