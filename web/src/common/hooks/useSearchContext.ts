import { SearchContext } from '@common/contexts/search';
import { useContext } from 'react';

const useSearchContext = () => useContext(SearchContext);

export default useSearchContext;
