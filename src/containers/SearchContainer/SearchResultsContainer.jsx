import { useState, useEffect } from 'react';
import { findNearest } from 'geolib';
import XMLParser from 'react-xml-parser';
import SearchResults from 'components/search/search-results.component';

let geoMap = require('data/geoMap.json');


const SearchResultsContainer = ({ searchResult }) => {
  const searchResultObject = searchResult && searchResult[0];
  const latitude = searchResultObject?.lat
  const longitude = searchResultObject?.lon
  const country = searchResultObject?.display_name.split(", ")[4].replace(" ","_")
  const state = searchResultObject?.display_name.split(", ")[2].replace(" ","_")
  let cityList;
  const [sightingChart, setSightingChart] = useState(null);

  const getCityArray = () => {
      if(country && state){
          const cityArray = geoMap[country][state]
          cityList = geoMap[country][state].map((cityObj) => {
              return {...cityObj}
          });
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

  useEffect( () => {
    if (country && state) {
      const closestLatLon = findNearest(
        {latitude: latitude,longitude: longitude}, getCityArray()
      );

      const cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude).city;
      fetchSightingData(cityName)
    }
  }, [country, state, latitude, longitude]);

  return (
    <SearchResults tableData={sightingChart}/>
  );
}

export default SearchResultsContainer;
