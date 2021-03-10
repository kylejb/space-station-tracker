import { useState } from "react"
import parse from 'html-react-parser'
import XMLParser from 'react-xml-parser'


const Sightingtable = ( {searchResult} ) => {
    
    console.log(searchResult)

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
                    <h3>Country: {searchResult.display_name.split(", ")[4]}</h3>
                    <h3>State: {searchResult.display_name.split(", ")[2]}</h3>
                </>
            }
            
        
        </>
    )

}


export default Sightingtable