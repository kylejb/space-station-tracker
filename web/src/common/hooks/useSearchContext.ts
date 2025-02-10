import { useContext } from 'react';

import { SearchContext } from '@common/contexts/search';

const useSearchContext = () => useContext(SearchContext);

export default useSearchContext;
