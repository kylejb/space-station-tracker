import { drawViewingArea } from 'utils/drawViewingAreaOnCompass';

const Compass = ({ entersSky, leavesSky }) => {
    return (
        <svg viewBox='0 0 608 608'>
            <g>
                <line
                    x1='304'
                    x2='304'
                    y1='64'
                    y2='544'
                    strokeWidth='2'
                    stroke='#FFFFFF'
                    opacity='0.4'
                ></line>
                <line
                    x1='64'
                    x2='544'
                    y1='304'
                    y2='304'
                    strokeWidth='2'
                    stroke='#FFFFFF'
                    opacity='0.4'
                ></line>

                <circle
                    cx='304'
                    cy='304'
                    r='180'
                    fill='transparent'
                    strokeWidth='2'
                    stroke='#FFFFFF'
                    opacity='0.4'
                ></circle>

                <text
                    fontSize='35'
                    fontWeight='bold'
                    fill='#ffffff'
                    textAnchor='middle'
                    transform='translate(304, 60)'
                >
                    N
                </text>
                <text
                    fontSize='30'
                    fontWeight='bold'
                    fill='#ffffff'
                    transform='translate(439.6, 175.6)'
                >
                    NE
                </text>
                <text
                    fontSize='35'
                    fontWeight='bold'
                    fill='#ffffff'
                    textAnchor='start'
                    alignmentBaseline='middle'
                    transform='translate(548, 307)'
                >
                    E
                </text>
                <text
                    fontSize='30'
                    fontWeight='bold'
                    fill='#ffffff'
                    transform='translate(441.6, 443.6)'
                >
                    SE
                </text>
                <text
                    fontSize='35'
                    fontWeight='bold'
                    fill='#ffffff'
                    textAnchor='middle'
                    transform='translate(304, 572)'
                >
                    S
                </text>
                <text
                    fontSize='30'
                    fontWeight='bold'
                    fill='#ffffff'
                    transform='translate(113.6, 443.6)'
                >
                    SW
                </text>
                <text
                    fontSize='35'
                    fontWeight='bold'
                    fill='#ffffff'
                    textAnchor='end'
                    alignmentBaseline='middle'
                    transform='translate(62, 307)'
                >
                    W
                </text>
                <text
                    fontSize='30'
                    fontWeight='bold'
                    fill='#ffffff'
                    transform='translate(117.6, 175.6)'
                >
                    NW
                </text>

                <path
                    d={drawViewingArea(entersSky, leavesSky)}
                    fill='transparent'
                    strokeWidth='6'
                    stroke='#4287f5'
                    markerStart='url(#arrowhead)'
                />
            </g>
        </svg>
    );
};

export default Compass;
