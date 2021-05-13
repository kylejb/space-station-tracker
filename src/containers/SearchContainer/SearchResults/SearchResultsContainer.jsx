import { useState, useEffect } from 'react';
import { findNearest, getDistance, convertDistance } from 'geolib';
import XMLParser from 'react-xml-parser';
import SightingTable from 'components/sightingtable';
import geoMap from 'data/geoMap.json';
import './style.scss';
import { FETCH_SUCCESS, FETCH_FAIL, FETCH_FAIL_MESSAGE, ZIPRESULTS_NONE_MESSAGE, SIGHTINGRESULTS_NONE_MESSAGE, ZIPLENGTH_ERROR_MESSAGE, INITIAL_LOAD } from 'utils/constants';
import Error from 'components/error'
import { useErrorContext } from 'ErrorContext';

const SearchResultsContainer = ({ searchResult, currentUser }) => {
    const [sightingChart, setSightingChart] = useState({value: null, status: INITIAL_LOAD}),
        [cityList, setCityList] = useState(null),
        [country, setCountry] = useState(currentUser.country),
        [state, setState] = useState(null);

    const { error, setErrorHelper } = useErrorContext();

    const cleanTableData = rawData => {
        const arrayOfHTMLStrings = rawData.map(item => item.children[2].value);
        const cleanData = [];
        for (const row of arrayOfHTMLStrings) {
            // spacing around split removes unnecessary whitespace without needing trim()
            const rowArray = row.split(' &lt;br/&gt; ');

            const approachObj = rowArray[4].split(": ")[1].replace('&#176;', '°');
            // 'Departure: 10&#176; above NE &lt;br/&gt;'
            const departureObj = rowArray[5].split(": ")[1].replace('&lt;br/&gt;', '').trim().replace('&#176;', '°');

            const rowObj = {
                date: new Date(rowArray[0].split(": ")[1]), // 'Date: Monday Mar 29, 2021'
                time: rowArray[1].split(": ")[1],
                duration: rowArray[2].split(": ")[1].replace("minutes", "min"),
                maxElevation: rowArray[3].split(": ")[1].split("&")[0],
                approachDir: approachObj.split("above")[1].trim(),
                approachDeg: approachObj.split(" ")[0].trim(),
                // 'Departure: 10&#176; above NE &lt;br/&gt;'
                departureDir: departureObj.split("above")[1].trim(),
                departureDeg: departureObj.split(" ")[0].trim(),
            };
            cleanData.push(rowObj);
        }
        return cleanData;
    }

    // helper function for cleanTableData
    // eslint-disable-next-line
    const createRowObj = (row) => {
        const rowArr = row.split(": ");
        return { [rowArr[0].toLowerCase()]: rowArr[1] }
    }

    useEffect(() => {
        const searchResultObject = searchResult.value[0];
        const countriesWithRegions = ["United_States", "Great_Britian", "Australia", "Canada"];
        const searchResultDisplayNameArray = searchResultObject?.display_name.split(", ");
        const _country = currentUser.country;
        // Regions - the key after countries - are "None" for all countries except the below
        const _state = searchResultDisplayNameArray && countriesWithRegions.includes(_country)
            ? searchResultDisplayNameArray[searchResultDisplayNameArray.length - 3].replace(" ", "_")
            : "None";

        if (searchResultObject) {
            setCountry(_country);
            setState(_state);
            // Deep cloning geoMap only when user defines searchResult (country and state handles edge cases)
            setCityList(JSON.parse(JSON.stringify(geoMap[_country][_state])));
        }
        // eslint-disable-next-line
    }, [searchResult, currentUser]);


    useEffect(() => {
        const getCityCoordsList = () => {
            const _cityCoordsList = [...cityList];
            if (country && state) {
                _cityCoordsList.forEach((cityObj) => {
                    delete { ...cityObj['city'] };
                });
                return _cityCoordsList;
            };
        }

        const fetchSightingData = (city) => {
            const proxyURL = `https://cors-anywhere.herokuapp.com/`; //! temporary PROXY_URL
            const baseURL = "https://spotthestation.nasa.gov/sightings/xml_files/";

            fetch(proxyURL + baseURL + country + "_" + state + "_" + city + ".xml")
                .then(response => response.text())
                .then(data => {
                    const xml = new XMLParser().parseFromString(data);

                    const itemData = xml.getElementsByTagName('item');
                    const cleanedData = cleanTableData(itemData);

                    setSightingChart({value: cleanedData, status: FETCH_SUCCESS});
                });
        }
        if (searchResult.value[0] && country && state) {
            let closestLatLon, cityName;

            if (cityList.length > 1) {
                closestLatLon = findNearest(
                    {
                        latitude: searchResult.value[0].lat,
                        longitude: searchResult.value[0].lon
                    },
                    getCityCoordsList()
                );
                cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude).city;
            } else {
                cityName = cityList[0].city
            }

            const distanceFromSpot = convertDistance(getDistance(
                {
                    latitude: searchResult.value[0].lat,
                    longitude: searchResult.value[0].lon
                },
                closestLatLon
            ), 'mi');

            // TODO - Improve UI based on the following concept:
            if (distanceFromSpot > 50) {
                console.log("TODO - User is not close enough to station", distanceFromSpot);
            } else {
                console.log("Distance is", distanceFromSpot);
                fetchSightingData(cityName);
            }
        }
    }, [searchResult, cityList, country, state]);

    const tempConditionalRender = () => {
        if (error.type !== "OK") {
            return <Error errormessage={error} />;
        } else if (searchResult.status === FETCH_SUCCESS && sightingChart.value?.length) {
            return <SightingTable tableData={sightingChart} />;
        } else if (searchResult.status === FETCH_FAIL || sightingChart.status === FETCH_FAIL) {
            return <Error errormessage={FETCH_FAIL_MESSAGE} />;
        } else if (sightingChart.status !== INITIAL_LOAD && !sightingChart.value.length) {
            return <Error errormessage={SIGHTINGRESULTS_NONE_MESSAGE} />;
        }
    }


    return (
        <>
            {tempConditionalRender()}
        </>
    );
}

export default SearchResultsContainer;


/*
["Date: Monday Mar 29, 2021 &lt;br/&gt; Time: 8:04 P…;br/&gt; Departure: 10&#176; above NE &lt;br/&gt;", "Date: Monday Mar 29, 2021 &lt;br/&gt; Time: 9:41 P…br/&gt; Departure: 22&#176; above NNW &lt;br/&gt;", "Date: Tuesday Mar 30, 2021 &lt;br/&gt; Time: 8:53 …;br/&gt; Departure: 25&#176; above NE &lt;br/&gt;", "Date: Wednesday Mar 31, 2021 &lt;br/&gt; Time: 8:0…br/&gt; Departure: 10&#176; above ENE &lt;br/&gt;", "Date: Wednesday Mar 31, 2021 &lt;br/&gt; Time: 9:4…;br/&gt; Departure: 28&#176; above NW &lt;br/&gt;", "Date: Thursday Apr 1, 2021 &lt;br/&gt; Time: 8:55 …br/&gt; Departure: 50&#176; above ENE &lt;br/&gt;", "Date: Friday Apr 2, 2021 &lt;br/&gt; Time: 8:08 PM…t;br/&gt; Departure: 14&#176; above E &lt;br/&gt;", "Date: Friday Apr 2, 2021 &lt;br/&gt; Time: 9:45 PM…t;br/&gt; Departure: 22&#176; above W &lt;br/&gt;", "Date: Saturday Apr 3, 2021 &lt;br/&gt; Time: 8:57 …t;br/&gt; Departure: 38&#176; above S &lt;br/&gt;", "Date: Sunday Apr 4, 2021 &lt;br/&gt; Time: 8:10 PM…;br/&gt; Departure: 13&#176; above SE &lt;br/&gt;", "Date: Monday Apr 5, 2021 &lt;br/&gt; Time: 9:00 PM…br/&gt; Departure: 11&#176; above SSW &lt;br/&gt;", "Date: Tuesday Apr 6, 2021 &lt;br/&gt; Time: 8:12 P…br/&gt; Departure: 10&#176; above SSE &lt;br/&gt;"]

*/
