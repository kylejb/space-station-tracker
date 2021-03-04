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

// Fetch Data from External Resources ***
const getSightingXML = async (country, region, city) => {
  const url = BASE_URL + country + '_' + region + '_' + city + '.xml';

  const response = await fetch(url);
  let raw_data = await response.text();

  // convert string to XML
  let xml_doc = new DOMParser().parseFromString(raw_data, 'text/xml');
  return xml_doc;
};

const getGeoData = async (country) => {
  const url = BASE_URL + country + '.html';

};
//
// End of Fetch Functions ***


// Data Conversion Functions ***
const responseTxtToHTML = (responseTxt) => {
  const resContainer = document.createElement('div');
  // converts text to HTML
  return resContainer.innerHTML = responseTxt;
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
