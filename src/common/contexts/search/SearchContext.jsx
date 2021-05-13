import { createContext } from 'react';

const defaultValue = {
    status: null,
    searchResult: [],
};

const SearchContext = createContext(defaultValue);

export default SearchContext;
