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

const SightingTable = ({ tableData }) => {

    const { error, addError, removeError } = useErrorContext();

    useEffect(() => {
        const _filteredSightingCards = () => {
            return tableData.value.filter(rowObj => (rowObj.date > filterSightingCardsByDate()
                && parseInt(rowObj.maxElevation) >= 90
                && parseInt(rowObj.duration[0])
            ));
        }

        const cardValidation = () => {
            const filteredCards = _filteredSightingCards();
            if (filteredCards.length) {
                removeError();

            } else {
                addError(
                    SIGHTINGRESULTS_DISTANCE_MESSAGE.message,
                    SIGHTINGRESULTS_DISTANCE_MESSAGE.type,
                );
            }
        }
        cardValidation();
    },[addError, removeError, tableData.value]);

    console.log("what is error in table");


    const filteredSightingCards = () => {
        return tableData.value.filter(rowObj => (rowObj.date > filterSightingCardsByDate()
            && parseInt(rowObj.maxElevation) >= 90
            && parseInt(rowObj.duration[0])
        ));
    }

    const renderSightingCards = () => {

        let count = -1;
        const filteredCards = filteredSightingCards()?.map( rowObj => (
            <SightingCard
                key={++count}
                sightingData={rowObj}
            />
        ));

        if (filteredCards.length) {
            return filteredCards;
        } else {
            addError(
                SIGHTINGRESULTS_DISTANCE_MESSAGE.message,
                SIGHTINGRESULTS_DISTANCE_MESSAGE.type,
            );
        }
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

export default SightingTable;
