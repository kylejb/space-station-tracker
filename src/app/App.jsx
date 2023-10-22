import { useCallback, useEffect, useState } from 'react';
import SearchContainer from 'containers/SearchContainer';
import Earth from 'features/earth';
import './app.scss';

const App = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [currentUser, setCurrentUser] = useState({ country: "" });

    useEffect(() => {
        const getUserCountry = async () => {
            const proxyURL = `https://cors-anywhere.herokuapp.com/`; //! temporary PROXY_URL
            const response = await fetch(`${proxyURL}https://freegeoip.app/json`);
            const data = await response.json();
            const userCountry = data.country_name;
            setCurrentUser({ country: userCountry.replace(" ", "_") });
        }
        getUserCountry();
    }, []);

    const fetchGeoDataFromZip = async (zip) => {
        const BASE_API_URL = `https://nominatim.openstreetmap.org/`;
        const ENDPOINT = `search?`;
        const PARAMS = `country=${currentUser.country.replace("_", "%20")}&postalcode=${zip}&format=json`;

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Student-Project-v0',
            },
        };

        if (zip !== "" && zip.length > 2) {
            const response = await fetch(BASE_API_URL + ENDPOINT + PARAMS, options);
            let data = await response.json();

            // when nothing is found, data is an empty array
            if (data[0]) {
                // Globe's dependencies expects searchResults to be iterable
                setSearchResult([data[0]]);
            } else {
                setSearchResult([]);
            }
        }
    };

    const resetSearchResultOnCountryChange = useCallback((userObj) => {
        setSearchResult([]);
        setCurrentUser(userObj);
    }, []);


    return (
        <div className="app">
            <SearchContainer
                currentUser={currentUser}
                searchResult={searchResult}
                fetchGeoDataFromZip={fetchGeoDataFromZip}
                setCurrentUser={resetSearchResultOnCountryChange}
            />
            <Earth searchResult={searchResult} />
        </div>
    );
};

export default App;
