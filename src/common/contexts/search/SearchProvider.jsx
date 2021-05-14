import { useState, useCallback } from 'react';
import SearchContext from './SearchContext';
import { SEARCH_RESET, INITIAL_LOAD } from 'utils/constants';

const initialState = {
    status: INITIAL_LOAD,
    value: [],
};


const SearchProvider = ({ children }) => {
    const [searchResult, setSearchResult] = useState(initialState);

    const removeSearchResult = () => setSearchResult({ status: SEARCH_RESET, value: [] });

    const addSearchResult = (value, status) => setSearchResult({ value, status });

    const contextValue = {
        searchResult,
        addSearchResult: useCallback((value, status) => addSearchResult(value, status), []),
        removeSearchResult: useCallback(() => removeSearchResult(), [])
    };

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
}


export default SearchProvider;
