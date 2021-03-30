import { useState, useEffect } from 'react';
import { findNearest } from 'geolib';
import XMLParser from 'react-xml-parser';
import SightingTable from 'components/sightingtable';

let geoMap = require('data/geoMap.json');

const SearchResultsContainer = ({ searchResult, currentUser }) => {
  const [sightingChart, setSightingChart] = useState(null);

  const searchResultObject = searchResult?.[0];
  const latitude = searchResultObject?.lat;
  const longitude = searchResultObject?.lon;

  // Regions - the key after countries - are "None" for all countries except the below
  const countriesWithRegions = ["United_States", "Great_Britian", "Australia", "Canada"];
  const country = currentUser?.country;

  const searchResultDisplayNameArray = searchResultObject?.display_name.split(", ");
  const state = searchResultDisplayNameArray && countriesWithRegions.includes(country)
    ? searchResultDisplayNameArray[searchResultDisplayNameArray.length - 3].replace(" ","_")
    : "None";

  // Deep cloning geoMap only when user defines searchResult (country and state handles edge cases)
  const cityArray = (searchResultObject && country && state) && JSON.parse(JSON.stringify(geoMap[country][state]));
  const cityList = (searchResultObject && country && state) && JSON.parse(JSON.stringify(geoMap[country][state]));

  const getCityArray = () => {
    if (country && state) {
      cityArray.forEach((cityObj) => {
        delete cityObj['city'];
      });
      return cityArray;
    };
  }

  const cleanTableData = rawData => {
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
      let closestLatLon, cityName;

      if (cityList.length > 1) {
        closestLatLon = findNearest(
          {
            latitude: latitude,
            longitude: longitude
          },
          getCityArray()
        );
        cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude).city;
      } else {
        cityName = cityList[0].city
      }
      fetchSightingData(cityName);
    }
    // eslint-disable-next-line
  }, [searchResult]);

  return (
    searchResult ? <SightingTable tableData={sightingChart}/> : null
  );
}

export default SearchResultsContainer;
