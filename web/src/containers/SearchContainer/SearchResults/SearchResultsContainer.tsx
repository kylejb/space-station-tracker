import geoMap from 'common/data/geoMap.json';
import { useErrorContext, useSearchContext } from 'common/hooks';
import Error from 'components/notification';
import SightingCardList from 'components/sightingcard';
import { convertDistance, findNearest, getDistance } from 'geolib';
import { useEffect, useState } from 'react';
import {
    FETCH_FAIL,
    FETCH_FAIL_MESSAGE,
    FETCH_SUCCESS,
    INITIAL_LOAD,
    SEARCH_RESET,
    SIGHTINGRESULTS_DISTANCE_MESSAGE,
    SIGHTINGRESULTS_NONE_MESSAGE,
} from 'utils/constants';

const DOMAIN = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9000';

const SearchResultsContainer = ({ currentUser }) => {
    // TODO: Replace 'any' with type defs
    const [sightingChart, setSightingChart] = useState<any>({ value: null, status: INITIAL_LOAD }),
        [cityList, setCityList] = useState<any>(null),
        [country, setCountry] = useState(currentUser.country),
        [state, setState] = useState(null);

    const { status, value } = useSearchContext();

    const { type, addError, removeError } = useErrorContext();

    useEffect(() => {
        if (status === FETCH_SUCCESS) {
            const searchResultObject = value[0];
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
                // Deep cloning geoMap only when user defines (country and state handles edge cases)
                setCityList(JSON.parse(JSON.stringify(geoMap[_country][_state])));
            }
        } else if (status === INITIAL_LOAD || status === SEARCH_RESET) {
            setSightingChart({ value: [], status: SEARCH_RESET });
        }
    }, [status, value, currentUser]);

    useEffect(() => {
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
                const response = await fetch(`${DOMAIN}/api/v1/spotthestation`, fetchOptions);
                const filteredData = await response.json();

                if (filteredData?.length) {
                    setSightingChart({ value: filteredData, status: FETCH_SUCCESS });
                } else {
                    setSightingChart({ value: [], status: SIGHTINGRESULTS_NONE_MESSAGE });
                    addError(
                        SIGHTINGRESULTS_NONE_MESSAGE.message,
                        SIGHTINGRESULTS_NONE_MESSAGE.type,
                    );
                }
            } catch (responseError) {
                setSightingChart({ value: [], status: FETCH_FAIL });
                addError(FETCH_FAIL_MESSAGE.message, FETCH_FAIL_MESSAGE.type);
            }
        };
        if (value[0] && country && state) {
            let closestLatLon;
            let cityName;

            if (cityList.length > 1) {
                closestLatLon = findNearest(
                    {
                        latitude: value[0].lat,
                        longitude: value[0].lon,
                    },
                    cityList,
                );
                cityName = cityList.find(
                    (city) =>
                        city.latitude === closestLatLon.latitude &&
                        city.longitude === closestLatLon.longitude,
                ).city;
            } else {
                // TODO: rework
                cityName = cityList[0]?.city;
            }

            const distanceFromSpot = convertDistance(
                getDistance(
                    {
                        latitude: value[0].lat,
                        longitude: value[0].lon,
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
    }, [value, cityList, country, state, addError, removeError]);

    return (
        <>
            <Error />
            {(sightingChart.status !== INITIAL_LOAD || sightingChart.status !== SEARCH_RESET) &&
                !type && <SightingCardList tableData={sightingChart} />}
        </>
    );
};

export default SearchResultsContainer;
