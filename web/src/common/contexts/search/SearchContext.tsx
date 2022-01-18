import { createContext } from 'react';
import { INITIAL_LOAD } from 'utils/constants';

const defaultState = {
    status: INITIAL_LOAD,
    value: [],
    addSearchResult: () => null,
    removeSearchResult: () => null,
};

interface ISearchValue {
    class: string;
    display_name: string; // '2nd District, Kabul, Kabul Province, 1001, Afghanistan';
    importance: number;
    lat: string;
    licence: string;
    lon: string;
    place_id: number;
    type: string;
}
interface ISearchContext {
    status: string;
    value: ISearchValue[];
    addSearchResult: (value: ISearchValue[], status: string) => void;
    removeSearchResult: () => void;
}

const SearchContext = createContext<ISearchContext>(defaultState);

export default SearchContext;
