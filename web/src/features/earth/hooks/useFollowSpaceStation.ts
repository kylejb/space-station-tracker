import React, { useEffect, useState } from 'react';

import { useSearchContext } from 'common/hooks';
import { FETCH_SUCCESS } from 'utils/constants';

import useGetSpaceStation from './useGetSpaceStation';

const useFollowSpaceStation = (refEl: React.MutableRefObject<any>, shouldFollowISS = false) => {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [followISS, setFollowISS] = useState(shouldFollowISS);

    const { data, isSuccess } = useGetSpaceStation();
    const { value, status } = useSearchContext();

    useEffect(() => {
        if (data?.length && isFirstLoad) {
            refEl.current.pointOfView({
                lat: data.latitude,
                lng: data.longitude,
                altitude: 2,
            });
            setIsFirstLoad(false);
        }

        refEl.current.controls().autoRotate = true;
        refEl.current.controls().autoRotateSpeed = 0.1;
    }, [data, isFirstLoad, refEl]);

    useEffect(() => {
        if (followISS && refEl.current) {
            refEl.current.controls().autoRotate = false;
            refEl.current.pointOfView({
                lat: data?.latitude,
                lng: data?.longitude,
                altitude: 2,
            });
        } else if (isSuccess) {
            refEl.current.controls().autoRotate = false;
        } else {
            refEl.current.controls().autoRotate = true;
        }
    }, [data, followISS, isSuccess, refEl]);

    useEffect(() => {
        if (status === FETCH_SUCCESS) {
            setFollowISS(false);
            refEl.current.controls().autoRotate = false;
            refEl.current.pointOfView({
                lat: value[0].lat,
                lng: value[0].lon,
                altitude: 1.9,
            });
        }
    }, [refEl, status, value]);

    // customLayerData in react-globe requires iterable objects
    return { satellites: (data && [data]) || [], followISS, isFirstLoad, setFollowISS, value };
};

export default useFollowSpaceStation;
