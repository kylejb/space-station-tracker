import { useState } from "react"
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
        cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude)
        console.log(cityName.city)
        
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
                </>
            }
            
        
        </>
    )

}


export default Sightingtable

/*
Where you left off with kyle 5pm 3.16.21:

const latitude = searchResult?.lat
    const longitude = searchResult?.lon
    const country = searchResult?.display_name.split(", ")[4].replace(" ","_")
    const state = searchResult?.display_name.split(", ")[2].replace(" ","_")
    let cityList
    let cityName

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
        cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude)
        console.log(cityName.city)
        
    }


*/