import { SEARCH_RESET, INITIAL_LOAD } from '@common/constants';
import { useState, useCallback, ReactNode } from 'react';
import SearchContext from './SearchContext';

const initialState = {
    status: INITIAL_LOAD,
    value: [],
};
interface Props {
    children: ReactNode;
}

function SearchProvider({ children }: Props): JSX.Element {
    const [searchResult, setSearchResult] = useState(initialState);

    const removeSearchResult = () => setSearchResult({ status: SEARCH_RESET, value: [] });

    const addSearchResult = (value, status) => setSearchResult({ value, status });

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const contextValue = {
        status: searchResult.status,
        value: searchResult.value,
        addSearchResult: useCallback((value, status) => addSearchResult(value, status), []),
        removeSearchResult: useCallback(() => removeSearchResult(), []),
    };

    return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}

export default SearchProvider;
