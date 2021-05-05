import SearchResultsContainer from './SearchResults';
import DropdownContainer from './Dropdown';
import Search from 'components/search';
import "./style.scss"
import { useEffect } from 'react';
import arc from 'svg-arc';


const Compass = props => {

    // create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 300 300');
 
    // create path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', '#ddd');
        svg.appendChild(path);
 
    // set path
        const d = arc({
            x: 150,
            y: 150,
            R: 100,
            r: 80,
            start: 100,
            end: 200,
        });
        path.setAttribute('d', d);
 
    // When drawing a annulus, the attribute value of 'fill-rule' must be set to 'evenodd', otherwise the color cannot be filled correctly.
        path.setAttribute('fill-rule', 'evenodd');

    return (
        <svg width="100%" viewBox="0 0 608 608">
            <g>
                <circle cx="304" cy="304" r="180" fill="transparent" strokeWidth="2" stroke="#FFFFFF"></circle>
                <line x1="304" x2="304" y1="64" y2="544" strokeWidth="2" stroke="#FFFFFF"></line>
                <line x1="64" x2="544" y1="304" y2="304" strokeWidth="2" stroke="#FFFFFF"></line>

                {/* Directions */}
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(433.6, 175.6)">NE</text>
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(443.6, 443.6)">SE</text>
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(113.6, 180.6)">NW</text>
                <text fontSize="30" fontWeight="bold" fill="#ffffff" transform="translate(113.6, 443.6)">SW</text>
                
                <circle id="au" class="spot" cx="163.6" cy="189.6" r="4" fill="#a85e32"></circle>
                <circle id="sl" class="spot" cx="433.6" cy="430" r="4" fill="#a85e32"></circle>
                <circle id="cp" class="spot2" cx="0" cy="0" r="4" fill="#a85e32"></circle>

                <path id="curve" d="M0 0" stroke="green" stroke-width="4" stroke-linecap="round" fill="transparent"></path>



                {/* <text fontSize="20" fontWeight="bold" fill="#ffffff" transform="translate(476.79999999999995, 131.20000000000002)">3.0</text>*/}
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="middle" transform="translate(304, 60)">N</text> 
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="start" alignmentBaseline="middle" transform="translate(548, 304)">E</text>
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="middle" transform="translate(304, 564)">S</text>
                <text fontSize="35" fontWeight="bold" fill="#ffffff" textAnchor="end" alignmentBaseline="middle" transform="translate(64, 304)">W</text>
                {/* <path fill="transparent" strokeWidth="1" stroke="#FFFFFF" d=" M 300 200 A 100 100 0 0 1 102 217" />
                <path fill="transparent" strokeWidth="2" stroke="#a85e32" d=" M 300 200 A 100 100 0 0 1 102 217" /> */}

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
