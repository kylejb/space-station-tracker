export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';
export const TAB_INDEX = {
    dropdownContainer: 1,
    searchInput: 2,
    searchSubmit: 3,
    faqOpen: 4,
    faqClose: 4,
    instructionsOpen: 5,
    instructionsClose: 5,
    sightingCard: -1,
    splashPage: -1,
};

export const INITIAL_LOAD = 'INITIAL_LOAD';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const SEARCH_RESET = 'SEARCH_RESET';

export const ZIPLENGTH_ERROR_MESSAGE = {
    type: 'ziplength',
    message: 'Please enter a valid zipcode.',
};

export const FETCH_FAIL_MESSAGE = { type: 'fetchfail', message: 'Oops, something went wrong...' };

export const ZIPRESULTS_NONE_MESSAGE = {
    type: 'nozipresults',
    message: 'Unable to locate zipcode in this country.',
};

export const SIGHTINGRESULTS_NONE_MESSAGE = {
    type: 'nosightingresults',
    message:
        'No sighting opportunities at your location at this time. The ISS might be passing over you during the day or at too low an angle in the sky to be visible. Check back in a few days!',
};

export const SIGHTINGRESULTS_DISTANCE_MESSAGE = {
    type: 'sightingtoofar',
    message: 'No sighting data near your location.',
};
