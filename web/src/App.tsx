import './app.scss';
import { useCallback, useState } from 'react';

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
    ZIPLENGTH_ERROR_MESSAGE,
    FETCH_FAIL_MESSAGE,
    ZIPRESULTS_NONE_MESSAGE,
} from 'utils/constants';

const DOMAIN = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9000';

const App = () => {
    const [currentUser, setCurrentUser] = useState({
        country: 'United_States',
        status: INITIAL_LOAD,
        countryCode: 'us',
    });
    const [firstLoad, setFirstLoad] = useState(true);
    const { searchResult, addSearchResult, removeSearchResult } = useSearchContext();
    const { addError } = useErrorContext();

    // TODO: refactor w/o second parameter and minimize duplicative code blocks (i.e., keep it DRY)
    const fetchGeoDataFromZip = async (zip, setUserSearchingToFalse) => {
        const BASE_API_URL = `https://nominatim.openstreetmap.org/`;
        const ENDPOINT = `search?`;
        const PARAMS = `country=${currentUser.country.replace(
            '_',
            '%20',
        )}&postalcode=${zip}&format=json`;

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Student-Project-v0',
            },
        };

        if (searchResult.status === FETCH_SUCCESS) {
            removeSearchResult();
        }

        if (zip !== '' && zip.length > 2) {
            try {
                const response = await fetch(BASE_API_URL + ENDPOINT + PARAMS, options);
                let data = await response.json();
                // when nothing is found, data is an empty array
                if (data[0].display_name.split(', ').length < 2) {
                    addError(FETCH_FAIL_MESSAGE.message, FETCH_FAIL_MESSAGE.type);
                    removeSearchResult();
                } else if (data[0]) {
                    // Globe's dependencies expects searchResults to be iterable
                    addSearchResult([data[0]], FETCH_SUCCESS);
                } else {
                    removeSearchResult();
                    addError(ZIPLENGTH_ERROR_MESSAGE.message, ZIPLENGTH_ERROR_MESSAGE.type);
                }
            } catch (error) {
                try {
                    const findCityByZipObj = { country: currentUser.countryCode, codes: zip };
                    const fetchOptions = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/text,application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(findCityByZipObj),
                    };

                    const nestedResponse = await fetch(DOMAIN + '/api/v1/city', fetchOptions);
                    let nestedData = await nestedResponse.json();

                    if (nestedData.type === 'error') {
                        removeSearchResult();
                        addError(FETCH_FAIL_MESSAGE.message, FETCH_FAIL_MESSAGE.type);
                    }
                    const cityFromZip = nestedData.city;

                    if (cityFromZip) {
                        const _PARAMS = `country=${currentUser.country.replace(
                            '_',
                            '%20',
                        )}&city=${cityFromZip}&format=json`;
                        const response = await fetch(BASE_API_URL + ENDPOINT + _PARAMS, options);
                        let data = await response.json();

                        if (data[0].display_name.split(', ').length < 2) {
                            addError(FETCH_FAIL_MESSAGE.message, FETCH_FAIL_MESSAGE.type);
                            removeSearchResult();
                        } else if (data[0]) {
                            // Globe's dependencies expects searchResults to be iterable
                            addSearchResult([data[0]], FETCH_SUCCESS);
                        } else {
                            removeSearchResult();
                            addError(ZIPLENGTH_ERROR_MESSAGE.message, ZIPLENGTH_ERROR_MESSAGE.type);
                        }
                    }
                } catch (nestedError) {
                    removeSearchResult();
                    addError(ZIPRESULTS_NONE_MESSAGE.message, ZIPRESULTS_NONE_MESSAGE.type);
                }
            }
        } else {
            addError(ZIPLENGTH_ERROR_MESSAGE.message, ZIPLENGTH_ERROR_MESSAGE.type);
        }
        setUserSearchingToFalse(false);
    };

    const resetSearchResultOnCountryChange = useCallback(
        (userObj) => {
            removeSearchResult();
            setCurrentUser(userObj);
        },
        [removeSearchResult],
    );

    const splashHider = () => {
        setFirstLoad(false);
    };

    return (
        <div className='app'>
            {firstLoad ? (
                <SplashPage splashHider={splashHider} />
            ) : (
                <>
                    <SearchContainer
                        currentUser={currentUser}
                        fetchGeoDataFromZip={fetchGeoDataFromZip}
                        setCurrentUser={resetSearchResultOnCountryChange}
                    />
                    <Earth />
                    <Faq />
                    <Instructions />
                    <Credits />
                </>
            )}
        </div>
    );
};

export default App;