import './app.scss';
import { useCallback, useEffect, useState } from 'react';

import SearchContainer from 'containers/SearchContainer';
import Earth from 'containers/EarthContainer';

import Instructions from 'components/instructions';
import SplashPage from 'components/splashpage';
import Credits from 'components/credits';
import Faq from 'components/faq';

import { INITIAL_LOAD, FETCH_SUCCESS, FETCH_FAIL } from 'utils/constants';
import { useSearchContext } from 'common/hooks';


const App = () => {
  const [currentUser, setCurrentUser] = useState({ country: "", status: INITIAL_LOAD });
  const [firstLoad, setFirstLoad] = useState(true)
  //NOTE: very similar state in Earth "isfirstload" could be causing the issue with the API call?
  const { addSearchResult, removeSearchResult } = useSearchContext();

  useEffect(() => {
    const getUserCountry = async () => {
      const proxyURL = `https://cors-anywhere.herokuapp.com/`; //! temporary PROXY_URL
      const response = await fetch(`${proxyURL}https://freegeoip.app/json`);
      const data = await response.json();

      // TODO - refactor 'data' condition based success/fail types (e.g., HTTP Error codes)
      if (data && data.country_name) {
        const userCountry = data.country_name;
        setCurrentUser({ country: userCountry.replace(" ", "_"), status: FETCH_SUCCESS });
      } else {
        // currently defaulting users to United_States
        setCurrentUser({ country: "United_States", status: FETCH_FAIL });
      }
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
        'User-Agent': 'Student-Project-v0'
      },
    };
    if (zip !== "" && zip.length > 2) {
        try{
            const response = await fetch(BASE_API_URL + ENDPOINT + PARAMS, options);
            let data = await response.json();
            //when nothing is found, data is an empty array
            if (data[0].display_name.split(", ").length < 2) {
                removeSearchResult();
            } else if (data[0]) {
                // Globe's dependencies expects searchResults to be iterable
                addSearchResult([data[0]], FETCH_SUCCESS);
            } else {
                removeSearchResult();
            }
        } catch (error) {
            removeSearchResult();
        }
    }
  };

  const resetSearchResultOnCountryChange = useCallback((userObj) => {
    removeSearchResult();
    setCurrentUser(userObj);
  }, []);


  const splashHider = () => {
    setFirstLoad(false)
    // currently causes the error from setallete API call
  }

  return (
    <div className="app">
        {/* {firstLoad ? <SplashPage splashHider={splashHider} /> : null} */}
        <SearchContainer
            currentUser={currentUser}
            fetchGeoDataFromZip={fetchGeoDataFromZip}
            setCurrentUser={resetSearchResultOnCountryChange}
        />
        <Earth />
        <Faq/>
        <Instructions/>
        <Credits/>
    </div>
  );
};

export default App;
