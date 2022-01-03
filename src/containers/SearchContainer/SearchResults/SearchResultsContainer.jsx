import { DateTime } from 'luxon';
import { findNearest, getDistance, convertDistance } from 'geolib';
import { useState, useEffect } from 'react';
import XMLParser from 'react-xml-parser';

import SightingCardList from 'components/sightingcard';
import Error from 'components/notification';

import { useErrorContext, useSearchContext } from 'common/hooks';
import geoMap from 'common/data/geoMap.json';

import {
    FETCH_SUCCESS,
    SIGHTINGRESULTS_NONE_MESSAGE,
    INITIAL_LOAD,
    SIGHTINGRESULTS_DISTANCE_MESSAGE,
    SEARCH_RESET,
    FETCH_FAIL,
    FETCH_FAIL_MESSAGE,
} from 'utils/constants';

import './style.scss';

const DOMAIN = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
const LIMIT_BY_N_DAYS = 5;
const FILTER_BY_DEGREES_GREATER_THAN = 20;

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

    // TEMP FIX: NASA API is providing invalid years for 2022 sightings
    if (!result && bareSightingDate.hasSame(bareFromDate.minus({ year: 1 }), 'year')) {
        const diffInDays = bareToDate.diff(bareSightingDate.plus({ year: 1 }), 'days').toObject();
        if (
            diffInDays.days >= 0 &&
            diffInDays.days <= 365 &&
            bareFromDate.toMillis() <= bareSightingDate.plus({ year: 1 }).toMillis() &&
            bareSightingDate.plus({ year: 1 }).toMillis() <= bareToDate.toMillis()
        )
            return true;
    }
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
                duration: rowArray[2].split(': ')[1].replace('minutes', 'min'),
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

    // helper function for cleanTableData
    // eslint-disable-next-line
    const createRowObj = (row) => {
        const rowArr = row.split(': ');
        return { [rowArr[0].toLowerCase()]: rowArr[1] };
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
                    parseInt(rowObj.duration[0]),
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
