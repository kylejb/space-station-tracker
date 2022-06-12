import { useQuery } from 'react-query';

import asyncFetch from 'utils/asyncFetch';

const useGetSightingData = (endpoint: string) => {
    return useQuery('sightings', () => asyncFetch(endpoint));
};

export default useGetSightingData;
