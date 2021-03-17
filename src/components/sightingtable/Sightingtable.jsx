import { useState, useEffect } from "react"
import parse from 'html-react-parser'
import XMLParser from 'react-xml-parser'
import { findNearest } from 'geolib';

let geoMap = require('geoMap.json')

const Sightingtable = ( {searchResult} ) => {
    
    const latitude = searchResult?.lat
    const longitude = searchResult?.lon
    const country = searchResult?.display_name.split(", ")[4].replace(" ","_")
    const state = searchResult?.display_name.split(", ")[2].replace(" ","_")
    let cityList
    let cityName
    const [sightingChart, setSightingChart] = useState("")


    const getCityArray = () => {
        if(country && state){
            const cityArray = geoMap[country][state]
            cityList = geoMap[country][state].map((cityObj) => {
                return {...cityObj}
            })
            cityArray.forEach((cityObj) => {
                delete cityObj['city']
            })
            return cityArray
        }
    }

    //Will probably want to refactor to render chart conditionally - using a useEffect?
    if(country && state){
        const closestLatLon = findNearest({latitude: latitude,longitude: longitude} ,getCityArray())
        cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude).city
        console.log("Searching here:", cityName)
    }


    const fetchSightingData = () => {
        
        const proxyURL = `https://cors-anywhere.herokuapp.com/`; //! temporary PROXY_URL
        const baseURL = "https://spotthestation.nasa.gov/sightings/xml_files/"

        // need to figure out why this is undefined
        console.log("city name right before fetch call:", cityName)

        fetch(proxyURL + baseURL + country + "_" + state + "_" + cityName + ".xml")
            .then(response => response.text())
            .then(data => {
                const xml = new XMLParser().parseFromString(data)
                console.log("This is the info!!!:", xml.getElementsByTagName('item'))                
                // setSightingLocationData(xml.getElementsByTagName('item'))

               }
            )
        }

    return(
        <>
            <h2>Search results below</h2>
            {   !searchResult 
                    ? 
                <p>No results yet, please search above</p> 
                    : 
                <>
                    <h3>Latitude: {searchResult.lat}</h3>
                    <h3>Longitude: {searchResult.lon}</h3>
                    <h3>Country: {searchResult.display_name.split(", ")[4].replace(" ","_")}</h3>
                    <h3>State: {searchResult.display_name.split(", ")[2].replace(" ","_")}</h3>
                    <p>Full data from API: {searchResult.display_name}</p>

                    <br/>
                    <button onClick={fetchSightingData}>Go get the sighting chart data! </button>
                    <br/>
                    
                    <p>
                        Chart data!!! ...after you search and then hit fetch button
                        {sightingChart}
                        Also example of needing to conditionally render with useState
                    </p>

                </>
            }
            
        
        </>
    )

}


export default Sightingtable

/*
Where you got stuck tryingt o convert stuff to state - forever re-rendering error:

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