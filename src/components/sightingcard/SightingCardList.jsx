import { useEffect } from 'react';
import SightingCard from './SightingCard';
import { useErrorContext } from 'common/hooks';
import { SIGHTINGRESULTS_DISTANCE_MESSAGE } from 'utils/constants';


const SightingCardList = ({ tableData }) => {
    const renderSightingCards = () => {
        let count = -1;
        return tableData.value.map( rowObj => (
            <SightingCard
                key={++count}
                sightingData={rowObj}
            />
        ));
    }

    const headerData = {
        date: "DATE",
        time: "TIME",
        duration: "DURATION"
    };
    return (
        <>
            <div className="sightingresults">
                <SightingCard header sightingData={headerData}/>
                { tableData.status === "FILTER_SUCCESS" && renderSightingCards()}
            </div>
        </>
    );
}

export default SightingCardList;
