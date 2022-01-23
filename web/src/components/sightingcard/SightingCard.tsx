import Compass from 'components/compass';

interface SightingCardProps {
    header?: boolean;
    isSelected?: boolean;
    selectSightingCard?: (sightingCardIndex?: number) => void;
    sightingData: any;
}
const baseStyle =
    'grid grid-cols-4 grid-flow-row auto-rows-max gap-4 p-4 text-gray-300 text-base hover:text-stone-50';
// TODO: Refactor SightingCard JSX with reusable components
const SightingCard = ({
    isSelected,
    selectSightingCard,
    sightingData,
    header = false,
}: SightingCardProps) => (
    <div
        className={
            header ? `${baseStyle} py-1 text-stone-50 text-lg` : `${baseStyle} cursor-pointer`
        }
        onClick={() => !header && selectSightingCard && selectSightingCard()} // TODO: refactor with appropriate type defs
    >
        <div
            // className={header ? 'flex justify-center pr-12 w-36' : 'w-32'}
            className='col-span-2 hover:text-stone-50'
        >
            {sightingData.date}
        </div>
        <div className={header ? 'flex flex-start' : ''}>{sightingData.time}</div>
        <div className='flex justify-between'>
            <div>{sightingData.duration}</div>
            {/* TODO: refactor and cleanup */}
            {isSelected ? (
                !header ? (
                    <div className='text-xs w-3 mt-2'>▲</div>
                ) : null
            ) : !header ? (
                <div className='text-xs w-3 mt-1'>▼</div>
            ) : null}
        </div>
        {isSelected ? (
            // className='grid grid-cols-2 col-span-3 justify-evenly text-xs cursor-pointer mt-2 w-72'
            // className='flex flex-col justify-center w-54'
            <div className='grid grid-cols-4 place-self-start place-content-center text-xs cursor-pointer mt-2 w-72'>
                <div className='col-span-2 mt-4'>
                    <div className='mb-1 underline decoration-1 decoration-solid'>Enters Sky</div>
                    <div className='mb-3'>
                        {sightingData.approachDir}: {sightingData.approachDeg} above horizon
                    </div>
                    <div className='mb-1 underline decoration-1 decoration-solid'>
                        Max Elevation
                    </div>
                    <div className='mb-3'>{sightingData.maxElevation}° above horizon</div>
                    <div className='mb-1 underline decoration-1 decoration-solid'>Leaves Sky</div>
                    <div className='mb-3'>
                        {sightingData.departureDir}: {sightingData.departureDeg} above horizon
                    </div>
                </div>
                <div className='col-span-2'>
                    <Compass
                        entersSky={sightingData.approachDir}
                        leavesSky={sightingData.departureDir}
                    />
                </div>
            </div>
        ) : null}
    </div>
);

SightingCard.defaultProps = {
    sightingData: {
        date: 'DATE',
        time: 'TIME',
        duration: 'DURATION',
    },
};

export default SightingCard;
