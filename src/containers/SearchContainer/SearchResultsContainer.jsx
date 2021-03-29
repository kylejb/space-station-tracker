import { useState, useEffect } from 'react';
import { findNearest } from 'geolib';
import XMLParser from 'react-xml-parser';
import SearchResults from 'components/search/search-results.component';

let geoMap = require('data/geoMap.json');

const SearchResultsContainer = ({ searchResult, currentUser }) => {
  const [sightingChart, setSightingChart] = useState(null);

  const searchResultObject = searchResult?.[0];
  const latitude = searchResultObject?.lat;
  const longitude = searchResultObject?.lon;

  const countriesWithRegions = ["United_States", "Great_Britian", "Australia", "Canada"];
  const country = currentUser.country;

  const searchResultDisplayNameArray = searchResultObject?.display_name.split(", ");
  const state = searchResultDisplayNameArray && countriesWithRegions.includes(country)
    ? searchResultDisplayNameArray[searchResultDisplayNameArray.length - 3].replace(" ","_")
    : "None";

  // Deep cloning geoMap only when user defines searchResult (country and state handles edge cases)
  const cityArray = (searchResult && country && state) && JSON.parse(JSON.stringify(geoMap[country][state]));
  const cityList = (searchResult && country && state) && JSON.parse(JSON.stringify(geoMap[country][state]));

  const getCityArray = () => {
    if (country && state) {
      cityArray.forEach((cityObj) => {
        delete cityObj['city'];
      });
      return cityArray;
    };
  }

  const cleanTableData = rawData => {
    //Pseudocode: Array[0-19] --> children[2].value
    return rawData.map( item => item.children[2].value );
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
      }
    );
  }

  useEffect(() => {
    if (searchResult && country && state) {
      const closestLatLon = findNearest(
        {
          latitude: latitude,
          longitude: longitude
        },
        getCityArray()
      );

      const cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude).city;

      fetchSightingData(cityName);
    }
  }, [searchResult]);

  return (
    searchResult ? <SearchResults tableData={sightingChart}/> : null
  );
}

export default SearchResultsContainer;
