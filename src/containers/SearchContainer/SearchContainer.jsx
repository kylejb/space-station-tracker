import SearchResultsContainer from './SearchResults';
import DropdownContainer from './Dropdown';
import Search from 'components/search';
import "./style.scss"
import { useEffect } from 'react';
import arc from 'svg-arc';


const Compass = props => {


    // library helper
        const arcAttributes = arc({
            x: 305,
            y: 305,
            R: 180,
            r: 180,
            start: 100,
            end: 200,
        });

        // Will need to avg the start and end points and then create a new "arc of 1 degree"
        const arcMidpoint = arc({
            x: 305,
            y: 305,
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
                
                {/* Arrow head */}
                <defs>
                    <marker id="arrowhead" fill="#4287f5" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 2.5 3.5, 0 7" />
                    </marker>
                </defs>

                {/* Curve that we'll need to render dynamically */}
                <path fill="transparent" strokeWidth="8" stroke="#4287f5" d={arcAttributes} markerStart="url(#arrowhead)"/>
                {/* <path fill="transparent" strokeWidth="8" stroke="#ff0000" d={arcMidpoint} /> */}

            </g>
            {/* <g>
                <text fill="#ffffff" fontSize="12" transform="translate(449.92, 564)">Color denotes wave period</text><text fill="#ffffff" fontSize="12" transform="translate(355.67999999999995, 583)">Wave Direction (°) vs Wave Energy (m^2Hz)</text>
            </g> */}

        </svg>
    );
}


const SearchContainer = ({ fetchGeoDataFromZip, searchResult, currentUser, setCurrentUser }) => {
    
    
    function drawLine() {
        const p1x = parseFloat(document.getElementById("au").getAttribute("cx"));
        const p1y = parseFloat(document.getElementById("au").getAttribute("cy"));
        const p2x = parseFloat(document.getElementById("sl").getAttribute("cx"));
        const p2y = parseFloat(document.getElementById("sl").getAttribute("cy"));

        // mid-point of line:
        const mpx = (p2x + p1x) * 0.5;
        const mpy = (p2y + p1y) * 0.5;

        // angle of perpendicular to line:
        const theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2 ;

        // distance of control point from mid-point of line:
        const offset = -290;

        // location of control point:
        const c1x = mpx + offset * Math.cos(theta);
        const c1y = mpy + offset * Math.sin(theta);

        // show where the control point is:
        const c1 = document.getElementById("cp");
        c1.setAttribute("cx", c1x);
        c1.setAttribute("cy", c1y);

        // construct the command to draw a quadratic curve
        const curve = "M" + p1x + " " + p1y + " Q " + c1x + " " + c1y + " " + p2x + " " + p2y;
        const curveElement = document.getElementById("curve");
        curveElement.setAttribute("d", curve);
    }

    return (
        <div className="search-container">
            <Search fetchGeoDataFromZip={fetchGeoDataFromZip} currentUser={currentUser}>
                <DropdownContainer currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </Search>
            <SearchResultsContainer currentUser={currentUser} searchResult={searchResult} />
            <Compass/>
            <button onClick={drawLine}>Draw the damn line son</button>
        </div>
    );
}

export default SearchContainer;
