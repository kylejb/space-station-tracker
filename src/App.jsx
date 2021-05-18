import './app.scss';
import { useCallback, useEffect, useState } from 'react';

import SearchContainer from 'containers/SearchContainer';
import Earth from 'containers/EarthContainer';

import Instructions from 'components/instructions';
import SplashPage from 'components/splashpage';
import Credits from 'components/credits';
import Faq from 'components/faq';


import { useSearchContext, useErrorContext } from 'common/hooks';
import {
    INITIAL_LOAD,
    FETCH_SUCCESS,
    FETCH_FAIL,
    ZIPLENGTH_ERROR_MESSAGE,
    FETCH_FAIL_MESSAGE,
    ZIPRESULTS_NONE_MESSAGE
} from 'utils/constants';



const App = () => {
    const [currentUser, setCurrentUser] = useState({ country: "United_States", status: INITIAL_LOAD });
    const [firstLoad, setFirstLoad] = useState(true)
    //NOTE: very similar state in Earth "isfirstload" could be causing the issue with the API call?
    const { searchResult, addSearchResult, removeSearchResult } = useSearchContext();
    const { addError } = useErrorContext();

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

        if (searchResult.status === FETCH_SUCCESS) {
            removeSearchResult();
        }

        if (zip !== "" && zip.length > 2) {
            try{
                const response = await fetch(BASE_API_URL + ENDPOINT + PARAMS, options);
                let data = await response.json();
                //when nothing is found, data is an empty array
                if (data[0].display_name.split(", ").length < 2) {
                    addError(FETCH_FAIL_MESSAGE.message, FETCH_FAIL_MESSAGE.type);
                    removeSearchResult();
                } else if (data[0]) {
                    // Globe's dependencies expects searchResults to be iterable
                    addSearchResult([data[0]], FETCH_SUCCESS);
                } else {
                    removeSearchResult();
                    addError(ZIPLENGTH_ERROR_MESSAGE.message, ZIPLENGTH_ERROR_MESSAGE.type)
                }
            } catch (error) {
                removeSearchResult();
                addError(ZIPRESULTS_NONE_MESSAGE.message, ZIPRESULTS_NONE_MESSAGE.type);
            }
        } else {
            addError(
                ZIPLENGTH_ERROR_MESSAGE.message,
                ZIPLENGTH_ERROR_MESSAGE.type,
            );
        }
    }

    const resetSearchResultOnCountryChange = useCallback((userObj) => {
        removeSearchResult();
        setCurrentUser(userObj);
    }, [removeSearchResult]);


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
