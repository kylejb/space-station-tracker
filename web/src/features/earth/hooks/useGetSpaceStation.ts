import { useQuery } from 'react-query';

import asyncFetch from 'utils/asyncFetch';

const useGetSpaceStation = () => {
    return useQuery(
        'iss',
        async () => {
            const data = await asyncFetch('https://api.wheretheiss.at/v1/satellites/25544');
            data.name = 'ISS';
            return data;
        },
        {
            refetchInterval: 5000,
        },
    );
};

export default useGetSpaceStation;
