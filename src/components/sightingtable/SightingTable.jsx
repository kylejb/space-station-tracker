import SightingCard from './SightingCard';
import { useErrorContext } from 'ErrorContext';
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
    const filteredSightingCards = () => {
        return tableData.value.filter(rowObj => (rowObj.date > filterSightingCardsByDate()
            && parseInt(rowObj.maxElevation) >= 30
            && parseInt(rowObj.duration[0])
        ));
    }

    const { error, setErrorHelper } = useErrorContext();
    console.log("what is error in table");

    // const cardValidation = () => {
    //     const filteredCards = filteredSightingCards();
    //     if (filteredCards.length) {
    //         setErrorHelper({
    //             type: "TABLE_OK",
    //             message: "",
    //         });

    //     } else {
    //         setErrorHelper({
    //             type: SIGHTINGRESULTS_DISTANCE_MESSAGE.type,
    //             message: SIGHTINGRESULTS_DISTANCE_MESSAGE.message,
    //         });
    //     }
    // }

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
            setErrorHelper({
                type: SIGHTINGRESULTS_DISTANCE_MESSAGE.type,
                message: SIGHTINGRESULTS_DISTANCE_MESSAGE.message,
            });
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
                {error.type === "OK" && renderSightingCards()}
            </div>
        </>
    );
}

export default SightingTable;
