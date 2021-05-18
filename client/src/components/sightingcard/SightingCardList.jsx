import SightingCard from './SightingCard';
import { FETCH_SUCCESS } from 'utils/constants';


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
        <div className="sightingresults">

            {tableData.status === FETCH_SUCCESS &&
                <>
                    <SightingCard header sightingData={headerData}/>
                    {renderSightingCards()}
                </>
            }
        </div>
    );
}

export default SightingCardList;
