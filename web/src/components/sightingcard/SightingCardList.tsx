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
        // TODO: revise key creation approach here and elsewhere
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
        }
        let count = -1;
        return tableData.value.map((rowObj, index) => (
            <SightingCard
                key={++count}
                sightingData={rowObj}
                isSelected={selectedSightingCardByIndex === index}
                selectSightingCard={() => toggleSightingCard(index)}
            />
        ));
    };

    const renderList =
        tableData.status === FETCH_SUCCESS ? (
            <div className='text-white bg-zinc-900 bg-opacity-75 rounded-lg animate-fade-in'>
                <h2 className='font-garet text-lg text-center text-white underline pt-4 pb tracking-wide'>
                    Sighting Opportunities
                </h2>
                <div className='text-gray-300 text-sm divide-zinc-700 divide-y last:divide-0'>
                    <SightingCard header />
                    {renderSightingCards()}
                </div>
            </div>
        ) : null; // TODO: consider adding default component for such situations instead of null

    return renderList;
};

export default SightingCardList;
