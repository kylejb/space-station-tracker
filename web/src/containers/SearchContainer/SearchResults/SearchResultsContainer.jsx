import { findNearest, getDistance, convertDistance } from 'geolib';
import { useState, useEffect } from 'react';

import Error from 'components/notification';
import SightingCardList from 'components/sightingcard';

import {
    FETCH_FAIL,
    FETCH_FAIL_MESSAGE,
    FETCH_SUCCESS,
    INITIAL_LOAD,
    SEARCH_RESET,
    SIGHTINGRESULTS_DISTANCE_MESSAGE,
    SIGHTINGRESULTS_NONE_MESSAGE,
} from 'utils/constants';
import geoMap from 'common/data/geoMap.json';
import { useErrorContext, useSearchContext } from 'common/hooks';

const DOMAIN = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9000';

const SearchResultsContainer = ({ currentUser }) => {
    const [sightingChart, setSightingChart] = useState({ value: null, status: INITIAL_LOAD }),
        [cityList, setCityList] = useState(null),
        [country, setCountry] = useState(currentUser.country),
        [state, setState] = useState(null);

    const { searchResult } = useSearchContext();

    const { error, addError, removeError } = useErrorContext();

    useEffect(() => {
        if (searchResult.status === FETCH_SUCCESS) {
            const searchResultObject = searchResult.value[0];
            const countriesWithRegions = ['United_States', 'Great_Britian', 'Australia', 'Canada'];
            const searchResultDisplayNameArray = searchResultObject?.display_name.split(', ');
            const _country = currentUser.country;
            // Regions - the key after countries - are "None" for all countries except the below
            const _state =
                searchResultDisplayNameArray && countriesWithRegions.includes(_country)
                    ? searchResultDisplayNameArray[searchResultDisplayNameArray.length - 3].replace(
                          ' ',
                          '_',
                      )
                    : 'None';
            if (searchResultObject) {
                setCountry(_country);
                setState(_state);
                // Deep cloning geoMap only when user defines searchResult (country and state handles edge cases)
                setCityList(JSON.parse(JSON.stringify(geoMap[_country][_state])));
            }
        } else if (searchResult.status === INITIAL_LOAD || searchResult.status === SEARCH_RESET) {
            setSightingChart({ value: [], status: SEARCH_RESET });
        }
    }, [searchResult, currentUser]);

    useEffect(() => {
        const getCityCoordsList = () => {
            const _cityCoordsList = [...cityList];
            if (country && state) {
                _cityCoordsList.forEach((cityObj) => {
                    delete { ...cityObj['city'] };
                });
                return _cityCoordsList;
            }
        };

        const fetchSightingData = async (city) => {
            const spotTheStationObj = { country, state, city };
            const fetchOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/text,application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(spotTheStationObj),
            };

            try {
                const response = await fetch(DOMAIN + '/api/v1/spotthestation', fetchOptions);
                const filteredData = await response.json();

                if (filteredData && filteredData.length) {
                    setSightingChart({ value: filteredData, status: FETCH_SUCCESS });
                } else {
                    setSightingChart({ value: [], status: SIGHTINGRESULTS_NONE_MESSAGE });
                    addError(
                        SIGHTINGRESULTS_NONE_MESSAGE.message,
                        SIGHTINGRESULTS_NONE_MESSAGE.type,
                    );
                }
            } catch (error) {
                setSightingChart({ value: [], status: FETCH_FAIL });
                addError(FETCH_FAIL_MESSAGE.message, FETCH_FAIL_MESSAGE.type);
            }
        };
        if (searchResult.value[0] && country && state) {
            let closestLatLon, cityName;

            if (cityList.length > 1) {
                closestLatLon = findNearest(
                    {
                        latitude: searchResult.value[0].lat,
                        longitude: searchResult.value[0].lon,
                    },
                    getCityCoordsList(),
                );
                cityName = cityList.find(
                    (city) =>
                        city['latitude'] === closestLatLon.latitude &&
                        city['longitude'] === closestLatLon.longitude,
                ).city;
            } else {
                cityName = cityList[0].city;
            }

            const distanceFromSpot = convertDistance(
                getDistance(
                    {
                        latitude: searchResult.value[0].lat,
                        longitude: searchResult.value[0].lon,
                    },
                    closestLatLon,
                ),
                'mi',
            );

            if (distanceFromSpot > 50) {
                addError(
                    SIGHTINGRESULTS_DISTANCE_MESSAGE.message,
                    SIGHTINGRESULTS_DISTANCE_MESSAGE.type,
                );
            } else {
                removeError();
                fetchSightingData(cityName);
            }
        }
    }, [searchResult, cityList, country, state, addError, removeError]);

    return (
        <>
            <Error />
            {(sightingChart.status !== INITIAL_LOAD || sightingChart.status !== SEARCH_RESET) &&
                !error.type && <SightingCardList tableData={sightingChart} />}
        </>
    );
};

export default SearchResultsContainer;
