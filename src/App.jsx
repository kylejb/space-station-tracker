import { useState, useEffect } from "react";
import Earth from "components/earth";
import Search from "components/search";
import Dropdown from "components/dropdown/Dropdown"
import Sightingtable from "components/sightingtable/Sightingtable"
import { useIpCoords } from 'use-ipcoords'

const App = () => {
  const [searchResult, setSearchResult] = useState(null);
  const { latitudeIp, longitudeIp } = useIpCoords();

  const fetchGeoDataFromZip = async (zip) => {
    const BASE_API_URL = `https://nominatim.openstreetmap.org/`;
    const ENDPOINT = `search?`;
    const PARAMS = `postalcode=${zip}&format=json`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Student-Project-v0'
      },
    };

    const response = await fetch(BASE_API_URL+ENDPOINT+PARAMS, options);
    let data = await response.json();
    // Globe's dependencies expects searchResults to be iterable
    setSearchResult([data[0]]);
  };

  const fetchNasaShowPages = async () => {
    const BASE_API_URL = "https://spotthestation.nasa.gov/"
    const ENDPOINT = "sightings/location_files/"
    const PARAMS = "United_States.html"

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Student-Project-v0'
      },
      mode: "no-cors"
      // Host: "spotthestation.nasa.gov",
      // Referer: "https://spotthestation.nasa.gov/"
    };

    fetch(BASE_API_URL+ENDPOINT+PARAMS, options)
    .then(response => console.log(response.json()))
    
    
  }
  

  return (
    <div className="App">
      <h1>App Component</h1>
      <Search fetchGeoDataFromZip={fetchGeoDataFromZip}/>
      <button onClick={fetchNasaShowPages}>Fetch united states data</button>
      <Earth searchResult={searchResult} />
      {/* <Dropdown/> */}
      <Sightingtable searchResult={searchResult} />
    </div>
  );
};

export default App;

/*
  Sample API DATA
  params#=> postalcode=11235&limit=1&format=json

  [
    {"place_id":260806683,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","boundingbox":["40.426184399845","40.746184399845","-74.111609216579","-73.791609216579"],"lat":"40.586184399845244","lon":"-73.95160921657897","display_name":"Brooklyn, Kings County, New York, 11235, United States","class":"place","type":"postcode","importance":0.33499999999999996},

    {"place_id":260174048,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","boundingbox":["54.518289806726","54.838289806726","25.264239402162","25.584239402162"],"lat":"54.678289806726255","lon":"25.4242394021625","display_name":"Naujosios Vilnios seniūnija, Vilnius, Vilnius city municipality, Vilnius County, 11235, Lithuania","class":"place","type":"postcode","importance":0.33499999999999996},

    {"place_id":260781578,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","boundingbox":["50.659756089348","50.979756089348","27.431140861057","27.751140861057"],"lat":"50.819756089348274","lon":"27.591140861057415","display_name":"Yemilchyne Rural Hromada, Novohrad-Volynskyi Raion, Zhytomyr Oblast, 11235, Ukraine","class":"place","type":"postcode","importance":0.33499999999999996}
  ]
*/

// Commented out fetch call to minimize burden on API during development
  // const ZipcodeQueryTest = async () => {
  //   const testEndpoint = `https://nominatim.openstreetmap.org/search?postalcode=11235&format=json`;
