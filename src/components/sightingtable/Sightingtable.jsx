import { useState, useEffect } from 'react';
import { findNearest } from 'geolib';
import XMLParser from 'react-xml-parser';

let geoMap = require('geoMap.json');

const SightingTable = ({ searchResult }) => {

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
        if(country && state){
            const closestLatLon = findNearest(
              {latitude: latitude,longitude: longitude}, getCityArray()
            );

            const cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude).city;
            fetchSightingData(cityName)
        }

    }, [country, state])

    const chartRows = () => {
        return sightingChart.map( row => <p>{row}</p> )
    }

    return(
        <>
            <h2>Search results below</h2>
            {   !searchResult
                    ?
                <p>No results yet, please search above</p>
                    :
                <>
                    <h3>Latitude: {latitude}</h3>
                    <h3>Longitude: {longitude}</h3>
                    <h3>Country: {country}</h3>
                    <h3>State: {state}</h3>
                    <p>Full data from API: {searchResultObject?.display_name}</p>

                    <br/>
                    <button onClick={fetchSightingData}>Go get the sighting chart data! </button>
                    <br/>

                    <p>
                        Chart data!!! ...after you search and then hit fetch button

                        {sightingChart && chartRows()}

                        Also example of needing to conditionally render with useState
                    </p>

                </>
            }


        </>
    )

}


export default SightingTable

/*
Where you got stuck trying to convert stuff to state - forever re-rendering error:

const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [cityList, setCityList] = useState("")
    const [cityName, setCityName] = useState("")

    useEffect((searchResult) => {
        if(searchResult)
            {
                setLatitude( searchResult.lat )
                setLongitude( searchResult.lon )
                setCountry( searchResult.display_name.split(", ")[4].replace(" ","_") )
                setState( searchResult.display_name.split(", ")[2].replace(" ","_") )
            }
        }, [searchResult]
    )

    const getCityArray = () => {
        if(country && state){
            const geoLibCityArray = geoMap[country][state]
            setCityList(geoMap[country][state])

            // cityList = geoMap[country][state].map((cityObj) => {
            //     return {...cityObj}
            // })

            geoLibCityArray.forEach((cityObj) => {
                delete cityObj['city']
            })
            return geoLibCityArray
        }
    }
    console.log(latitude)

    //Will probably want to refactor to render chart conditionally - using a useEffect?
    if(country && state){
        const closestLatLon = findNearest({latitude: latitude,longitude: longitude} ,getCityArray())
        // cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude)
        // console.log(cityName)
    }



*/
