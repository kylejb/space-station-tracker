export const INITIAL_LOAD = "INITIAL_LOAD";

export const FETCH_SUCCESS = "FETCH_SUCCESS";
//currently used for two fetches:
// 1. Get country from IP address 2. fetchGetData from Zipcode (passed to earth and )
//NOT being used in searchresults container to fetch sightingdata yet

export const FETCH_FAIL = "FETCH_FAIL";
export const SEARCH_RESET = "SEARCH_RESET";

/*
Leaving commented out for now to now break anything

Errors we need to ccount for:
1. Zip length <=2 (Occurs in search component) -- Message: "Please enter valid zipcode"
2. FETCHING: Failure of any of three fetch calls (Country from IP, GeodatafromZip, SightingData from Nasa scraping) -- Message: "Error in our system - 404"
3. EMPTY DATA: Successful final Nasa sighting fetch, but...
    3a. zipcode doesn't exist or Prince edward island situation -- Message: "No results found with this zip"
    3b. no sightings (including what we filter) - is filteredSightingCards.length === 0 -- Message: "No sighting opportunities :( check back later gator"
*/

export const ZIPLENGTH_ERROR_MESSAGE = {type: "ziplength", message: "Please enter a valid zipcode."}

export const FETCH_FAIL_MESSAGE = {type: "fetchfail", message: "Oops, something went wrong..."}

export const ZIPRESULTS_NONE_MESSAGE = {type: "nozipresults", message: "No results found with this zipcode"}

export const SIGHTINGRESULTS_NONE_MESSAGE = {type: "nosightingresults", message: "No sighting opportunities at your location at this time. Check back later!"}

export const SIGHTINGRESULTS_DISTANCE_MESSAGE = {type: "sightingtoofar", message: "Out of bounds; no visibility near you."}
