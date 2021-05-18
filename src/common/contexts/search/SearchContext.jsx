import { createContext } from 'react';
import { INITIAL_LOAD } from 'utils/constants';

const defaultValue = {
    status: INITIAL_LOAD,
    value: [],
};

const SearchContext = createContext(defaultValue);

export default SearchContext;
