import { drawViewingArea } from 'utils/drawViewingAreaOnCompass';
import arc from 'svg-arc';
import './style.scss';

const Compass = ({ entersSky, leavesSky }) => {

    const pathHelper = () => {
        let path = arc(drawViewingArea(entersSky, leavesSky))
        let straightPath = path.replace(/A 180/g, "A 0")
        if(Math.abs(entersSky - leavesSky) === 180){
            return straightPath
        }
        return path
    }

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
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(439.6, 175.6)">NE</text>
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="start" alignmentBaseline="middle" transform="translate(548, 307)">E</text>
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(441.6, 443.6)">SE</text>
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="middle" transform="translate(304, 572)">S</text>
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(113.6, 443.6)">SW</text>
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="end" alignmentBaseline="middle" transform="translate(62, 307)">W</text>
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(117.6, 175.6)">NW</text>

                {/* Arrow head - find better solution later */}
                {/* <defs>
                    <marker id="arrowhead" fill="#4287f5" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto-start-reverse">
                        <polygon points="0 0, 2.5 3.5, 0 7" />
                    </marker>
                    <marker id='head' orient="auto"
                        markerWidth='2' markerHeight='4'
                        refX='0.1' refY='2'>
                         <path d='M0,0 V4 L2,2 Z' fill="red"/>
                    </marker>
                </defs> */}

                {/* Curve that we'll need to render dynamically */}
                <path
                    d={pathHelper()}
                    fill="transparent"
                    strokeWidth="6"
                    stroke="#4287f5"
                    markerStart="url(#arrowhead)"
                    
                />

                {/* const part = (x, y, R, r, start, end) => {
                const [s, e] = [(start / 360) * 2 * Math.PI, (end / 360) * 2 * Math.PI];
                const P = [
                    point(x, y, r, s),
                    point(x, y, R, s),
                    point(x, y, R, e),
                    point(x, y, r, e),
                ];
                const flag = e - s > Math.PI ? '1' : '0';
                return `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${R} ${R} 0 ${flag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${r} ${r}  0 ${flag} 0 ${P[0][0]} ${P[0][1]} Z`;
                }; */}


                {/* <path fill="transparent" strokeWidth="8" stroke="#ff0000" d={arcMidpoint} /> */}

            </g>
            {/* <g>
                <text fill="#ffffff" fontSize="12" transform="translate(449.92, 564)">Color denotes wave period</text><text fill="#ffffff" fontSize="12" transform="translate(355.67999999999995, 583)">Wave Direction (°) vs Wave Energy (m^2Hz)</text>
            </g> */}

        </svg>
    );
}


export default Compass;
