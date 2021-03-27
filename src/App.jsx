import { useState } from 'react';
import Search from 'containers/search';
// import Earth from 'components/earth';

const App = () => {
  const [searchResult, setSearchResult] = useState(null);

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

  return (
    <div className="app">
      <h1>App Component</h1>
      <Search fetchGeoDataFromZip={fetchGeoDataFromZip}/>
      {/* <Earth searchResult={searchResult} /> */}
    </div>
  );
};

export default App;
