import { useState, useCallback } from 'react';
import SearchContext from './SearchContext';

const initialState = {
    status: null,
    searchResult: [],
};


const SearchProvider = ({ children }) => {
    const [searchValues, setSearchValues] = useState(initialState);

    const removeSearchValues = () => setSearchValues({ status: false, searchResult: [] });

    const addSearchValues = (searchResult, status) => setSearchValues({ searchResult, status });

    const contextValue = {
        searchValues,
        addError: useCallback((searchResult, status) => addSearchValues(searchResult, status), []),
        removeError: useCallback(() => removeSearchValues(), [])
    };

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
}


export default SearchProvider;
