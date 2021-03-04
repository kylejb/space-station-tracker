const PROXY_URL = `https://cors-anywhere.herokuapp.com/`;
const BASE_URI = `https://spotthestation.nasa.gov/`;
const EP = `sightings/location_files/`;
const BASE_URL = PROXY_URL+BASE_URI+EP;

/*
COUNTRY_REGION/STATE_CITY
  For example:
    - United_States_New_York_New_York.xml


  value within HTML's option is formatted properly for fetch request
  ? - algo to extract all data
*/
let COUNTRY = "";
let REGION = "";
let CITY = "";

const getLocation = () => null;

const getRegionInLocation = () => null;

// Helper function for all Fetch calls
const getFetchBase = async (urlEndpoint, urlResource = 'html') => {
  const url = BASE_URL + urlEndpoint + '.' + urlResource;
  const response = await fetch(url);
  let raw_data = await response.text();
  return raw_data;
}

// Fetch Data from External Resources ***
const getSighting = async (nearestLocation) => {
  // nearestLocation must be formatted properly
  return getFetchBase(nearestLocation, 'xml');
};

const getGeoData = async (country) => {
  return getFetchBase(country, 'html');
};
//
// End of Fetch Functions ***


// Data Conversion Functions ***
const fetchedDataToHTML = (responseTxt) => {
  const resContainer = document.createElement('div');
  // converts text to HTML
  return resContainer.innerHTML = responseTxt;
};

const fetchedDataToXML = (responseTxt) => {
  // convert string to XML
  const xml_doc = new DOMParser().parseFromString(responseTxt, 'text/xml');
  return xml_doc;
};

const htmlToObj = (_html) => {
  const tempObj = [];
  for (const optionObj of _html.children) {
    tempObj.push(optionObj.value);
  };
  return tempObj;
};
//
// End of Data Conversion Functions ***
