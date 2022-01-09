import { useState } from 'react';

import { FETCH_SUCCESS } from 'utils/constants';

import SightingCard from './SightingCard';

const LIMIT = 10;

const SightingCardList = ({ tableData }) => {
    const [selectedSightingCardByIndex, setSelectedSightingCardByIndex] = useState(null);

    const selectSightingCard = (sightingCardIndex) => {
        setSelectedSightingCardByIndex(sightingCardIndex);
    };

    const toggleSightingCard = (sightingCardIndex) => {
        if (selectedSightingCardByIndex === sightingCardIndex) {
            setSelectedSightingCardByIndex(null);
        } else {
            selectSightingCard(sightingCardIndex);
        }
    };

    const renderSightingCards = () => {
        if (tableData.value.length > LIMIT) {
            let count = -1;
            return tableData.value
                .slice(0, LIMIT)
                .map((rowObj, index) => (
                    <SightingCard
                        key={++count}
                        sightingData={rowObj}
                        isSelected={selectedSightingCardByIndex === index}
                        selectSightingCard={() => toggleSightingCard(index)}
                    />
                ));
        } else {
            let count = -1;
            return tableData.value.map((rowObj, index) => (
                <SightingCard
                    key={++count}
                    sightingData={rowObj}
                    isSelected={selectedSightingCardByIndex === index}
                    selectSightingCard={() => toggleSightingCard(index)}
                />
            ));
        }
    };

    const headerData = {
        date: 'DATE',
        time: 'TIME',
        duration: 'DURATION',
    };

    return (
        <>
            {tableData.status === FETCH_SUCCESS ? (
                <div className='flex flex-col text-white bg-zinc-900 bg-opacity-75 rounded-md animate-fade-in'>
                    <div>
                        <h2 className='font-garet text-lg text-center text-white underline'>
                            Sighting Opportunities
                        </h2>
                    </div>
                    <div className='divide-zinc-700 divide-y-2 last:divide-0'>
                        <SightingCard header sightingData={headerData} />
                        {renderSightingCards()}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default SightingCardList;
