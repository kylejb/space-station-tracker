import { useEffect } from 'react';
import SightingCard from './SightingCard';
import { useErrorContext } from 'common/hooks';
import { SIGHTINGRESULTS_DISTANCE_MESSAGE } from 'utils/constants';

/**
 * Create a historic Date object.
 *
 * Helper function to set a baseline for items to return.
 *
 * @param {number}  numOfDays=1     Set the number of days from present to return with default of 1.
 *
 * @yield {Date}    Returns past date for filtering purposes.
 */
const filterSightingCardsByDate = (numOfDays=1) => {
    const dateThreshold = new Date();
    return new Date(dateThreshold.setDate(dateThreshold.getDate() - numOfDays));
}

const SightingCardList = ({ tableData }) => {


    const filteredSightingCards = () => {
        return tableData.value?.filter(rowObj => (rowObj.date > filterSightingCardsByDate()
            && parseInt(rowObj.maxElevation) >= 30
            && parseInt(rowObj.duration[0])
        ));
    }

    const renderSightingCards = () => {

        let count = -1;
        return filteredSightingCards()?.map( rowObj => (
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
                {renderSightingCards()}
            </div>
        </>
    );
}

export default SightingCardList;
