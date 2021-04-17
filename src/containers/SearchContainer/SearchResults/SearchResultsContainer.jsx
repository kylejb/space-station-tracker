import { useState, useEffect } from 'react';
import { findNearest } from 'geolib';
import XMLParser from 'react-xml-parser';
import SightingTable from 'components/sightingtable';
import geoMap from 'data/geoMap.json';

const SearchResultsContainer = ({ searchResult, currentUser }) => {
    const [sightingChart, setSightingChart] = useState(null),
          [cityList, setCityList] = useState(null),
          [country, ] = useState(currentUser.country),
          [state, setState] = useState(null);


    const cleanTableData = rawData => {
        const arrayOfHTMLStrings = rawData.map( item => item.children[2].value );
        const cleanData = [];
        for (const row of arrayOfHTMLStrings) {
            // spacing around split removes unnecessary whitespace without needing trim()
            const rowArray = row.split(' &lt;br/&gt; ');
            const rowObj = {
                date: rowArray[0].split(": ")[1], // 'Date: Monday Mar 29, 2021'
                time: rowArray[1].split(": ")[1],
                duration: rowArray[2].split(": ")[1],
                maxElevation: rowArray[3].split(": ")[1],
                approach: rowArray[4].split(": ")[1],
                // 'Departure: 10&#176; above NE &lt;br/&gt;'
                departure: rowArray[5].split(": ")[1].replace('&lt;br/&gt;', '').trim(),
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
        const searchResultObject = searchResult[0];
        const countriesWithRegions = ["United_States", "Great_Britian", "Australia", "Canada"];
        const searchResultDisplayNameArray = searchResultObject?.display_name.split(", ");
        // Regions - the key after countries - are "None" for all countries except the below
        const state = searchResultDisplayNameArray && countriesWithRegions.includes(country)
        ? searchResultDisplayNameArray[searchResultDisplayNameArray.length - 3].replace(" ","_")
        : "None";

        // Deep cloning geoMap only when user defines searchResult (country and state handles edge cases)
        setCityList(JSON.parse(JSON.stringify(geoMap[country][state])));
        setState(state);
    // eslint-disable-next-line
    }, []);


    useEffect(() => {
        const getCityCoordsList = () => {
            const _cityCoordsList = [...cityList];
            if (country && state) {
                _cityCoordsList.forEach((cityObj) => {
                delete {...cityObj['city']};
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

                setSightingChart(cleanedData);
            });
        }
        if (searchResult && country && state) {
            let closestLatLon, cityName;

            if (cityList.length > 1) {
                closestLatLon = findNearest(
                {
                    latitude: searchResult[0].lat,
                    longitude: searchResult[0].lon
                },
                getCityCoordsList()
                );

                cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude).city;
            } else {
                cityName = cityList[0].city
            }
            fetchSightingData(cityName);
        }
    }, [searchResult, cityList, country, state]);


    return (
        searchResult ? <SightingTable tableData={sightingChart}/> : null
    );
}

export default SearchResultsContainer;


/*
["Date: Monday Mar 29, 2021 &lt;br/&gt; Time: 8:04 P…;br/&gt; Departure: 10&#176; above NE &lt;br/&gt;", "Date: Monday Mar 29, 2021 &lt;br/&gt; Time: 9:41 P…br/&gt; Departure: 22&#176; above NNW &lt;br/&gt;", "Date: Tuesday Mar 30, 2021 &lt;br/&gt; Time: 8:53 …;br/&gt; Departure: 25&#176; above NE &lt;br/&gt;", "Date: Wednesday Mar 31, 2021 &lt;br/&gt; Time: 8:0…br/&gt; Departure: 10&#176; above ENE &lt;br/&gt;", "Date: Wednesday Mar 31, 2021 &lt;br/&gt; Time: 9:4…;br/&gt; Departure: 28&#176; above NW &lt;br/&gt;", "Date: Thursday Apr 1, 2021 &lt;br/&gt; Time: 8:55 …br/&gt; Departure: 50&#176; above ENE &lt;br/&gt;", "Date: Friday Apr 2, 2021 &lt;br/&gt; Time: 8:08 PM…t;br/&gt; Departure: 14&#176; above E &lt;br/&gt;", "Date: Friday Apr 2, 2021 &lt;br/&gt; Time: 9:45 PM…t;br/&gt; Departure: 22&#176; above W &lt;br/&gt;", "Date: Saturday Apr 3, 2021 &lt;br/&gt; Time: 8:57 …t;br/&gt; Departure: 38&#176; above S &lt;br/&gt;", "Date: Sunday Apr 4, 2021 &lt;br/&gt; Time: 8:10 PM…;br/&gt; Departure: 13&#176; above SE &lt;br/&gt;", "Date: Monday Apr 5, 2021 &lt;br/&gt; Time: 9:00 PM…br/&gt; Departure: 11&#176; above SSW &lt;br/&gt;", "Date: Tuesday Apr 6, 2021 &lt;br/&gt; Time: 8:12 P…br/&gt; Departure: 10&#176; above SSE &lt;br/&gt;"]

*/
