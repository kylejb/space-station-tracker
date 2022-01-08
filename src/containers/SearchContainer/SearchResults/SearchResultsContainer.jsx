import { DateTime } from 'luxon';
import { findNearest, getDistance, convertDistance } from 'geolib';
import { useState, useEffect } from 'react';
import XMLParser from 'react-xml-parser';

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

import './style.scss';

const DOMAIN = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
const FILTER_BY_DEGREES_GREATER_THAN = 20;
const FILTER_BY_DURATION_GREATER_THAN = 1; // in minutes
const LIMIT_BY_N_DAYS = 8;

const bareDate = (dateObject) => {
    const yearMonthDateArray = dateObject.toISOString().split('T')[0].split('-');
    const [year, month, day] = yearMonthDateArray;
    return DateTime.utc(parseInt(year), parseInt(month), parseInt(day));
};

// TODO: Refactor
const shouldIncludeSightingCard = (sightingCardDate, limitByNumOfDays = LIMIT_BY_N_DAYS) => {
    const fromDate = DateTime.now().toUTC();
    const toDate = fromDate.plus({ day: limitByNumOfDays });

    // bareDate scrubs time to simplify consistency when calculating range
    const bareSightingDate = bareDate(sightingCardDate);
    const bareFromDate = bareDate(fromDate.toJSDate());
    const bareToDate = bareDate(toDate.toJSDate()).plus({ day: 1 });

    const result =
        bareFromDate.toMillis() <= bareSightingDate.toMillis() &&
        bareSightingDate.toMillis() <= bareToDate.toMillis();

    return result;
};

const SearchResultsContainer = ({ currentUser }) => {
    const [sightingChart, setSightingChart] = useState({ value: null, status: INITIAL_LOAD }),
        [cityList, setCityList] = useState(null),
        [country, setCountry] = useState(currentUser.country),
        [state, setState] = useState(null);

    const { searchResult } = useSearchContext();

    const { error, addError, removeError } = useErrorContext();

    const cleanTableData = (rawData) => {
        const arrayOfHTMLStrings = rawData.map((item) => item.children[2].value);
        const cleanData = [];
        for (const row of arrayOfHTMLStrings) {
            // spacing around split removes unnecessary whitespace without needing trim()
            const rowArray = row.split(' &lt;br/&gt; ');

            const approachObj = rowArray[4].split(': ')[1].replace('&#176;', '°');
            // 'Departure: 10&#176; above NE &lt;br/&gt;'
            const departureObj = rowArray[5]
                .split(': ')[1]
                .replace('&lt;br/&gt;', '')
                .trim()
                .replace('&#176;', '°');

            const rowObj = {
                date: new Date(rowArray[0].split(': ')[1]), // 'Date: Monday Mar 29, 2021'
                time: rowArray[1].split(': ')[1],
                duration: rowArray[2].split(': ')[1].replace(/minute/, 'min'),
                maxElevation: rowArray[3].split(': ')[1].split('&')[0],
                approachDir: approachObj.split('above')[1].trim(),
                approachDeg: approachObj.split(' ')[0].trim(),
                // 'Departure: 10&#176; above NE &lt;br/&gt;'
                departureDir: departureObj.split('above')[1].trim(),
                departureDeg: departureObj.split(' ')[0].trim(),
            };
            cleanData.push(rowObj);
        }
        return cleanData;
    };

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

        const filteredSightingCards = (data) => {
            return data?.filter(
                (rowObj) =>
                    shouldIncludeSightingCard(rowObj.date) &&
                    parseInt(rowObj.maxElevation) >= FILTER_BY_DEGREES_GREATER_THAN &&
                    parseInt(rowObj.duration[0]) > FILTER_BY_DURATION_GREATER_THAN,
            );
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
                const data = await response.text();
                const xml = new XMLParser().parseFromString(data);
                const itemData = xml.getElementsByTagName('item');
                let cleanedData = cleanTableData(itemData);
                cleanedData = filteredSightingCards(cleanedData);

                if (cleanedData && cleanedData.length) {
                    setSightingChart({ value: cleanedData, status: FETCH_SUCCESS });
                } else {
                    setSightingChart({ value: [], status: SIGHTINGRESULTS_NONE_MESSAGE });
                    addError(
                        SIGHTINGRESULTS_NONE_MESSAGE.message,
                        SIGHTINGRESULTS_NONE_MESSAGE.type,
                    );
                }
            } catch (error) {
                console.error(error);
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
