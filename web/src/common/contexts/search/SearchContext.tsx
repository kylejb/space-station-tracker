import { createContext } from 'react';
import { INITIAL_LOAD } from 'utils/constants';

const defaultState = {
    status: INITIAL_LOAD,
    value: [],
    addSearchResult: (value, status) => null,
    removeSearchResult: () => null,
};

interface ISearchContext {
    status: string;
    value: any[];
    addSearchResult: (value, status) => void;
    removeSearchResult: () => void;
}

const SearchContext = createContext<ISearchContext>(defaultState);

export default SearchContext;
