import { FETCH_SUCCESS } from 'utils/constants';

import SightingCard from './SightingCard';

const LIMIT = 7;

const SightingCardList = ({ tableData }) => {
    const renderSightingCards = () => {
        if (tableData.value.length > LIMIT) {
            let count = -1;
            return tableData.value
                .slice(0, LIMIT)
                .map((rowObj) => <SightingCard key={++count} sightingData={rowObj} />);
        } else {
            let count = -1;
            return tableData.value.map((rowObj) => (
                <SightingCard key={++count} sightingData={rowObj} />
            ));
        }
    };

    const headerData = {
        date: 'DATE',
        time: 'TIME',
        duration: 'DURATION',
    };
    return (
        <div className='sightingresults-wrapper'>
            {tableData.status === FETCH_SUCCESS && (
                <div className='sightingresults'>
                    <div>
                        <h1 id='tabletitle'>Sighting Opportunities</h1>
                    </div>
                    <SightingCard header sightingData={headerData} />
                    {renderSightingCards()}
                </div>
            )}
        </div>
    );
};

export default SightingCardList;
