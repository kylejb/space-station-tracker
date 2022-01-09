import Compass from 'components/compass';

type SightingCardProps = {
    header?: boolean;
    isSelected?: boolean;
    selectSightingCard?: (sightingCardIndex?: number) => void;
    sightingData: any;
};

// TODO: Refactor SightingCard JSX with reusable components
const SightingCard = ({
    isSelected,
    selectSightingCard,
    sightingData,
    header = false,
}: SightingCardProps) => (
    <div
        className='flex flex-col justify-center content-center text-gray-300 p-4 text-sm hover:text-stone-50'
        onClick={() => {
            !header && selectSightingCard && selectSightingCard(); // TODO: refactor with appropriate type defs
        }}
    >
        <div
            className={
                header
                    ? 'flex flex-row justify-between py-1 border-zinc-800 font-bold text-stone-50'
                    : 'flex flex-row justify-between items-center cursor-pointer'
            }
        >
            <span className={header ? 'flex justify-center pr-12 w-36' : 'w-32'}>
                {header ? sightingData.date : sightingData.date}
            </span>
            <span className={header ? 'flex flex-start w-10' : 'w-14'}>{sightingData.time}</span>
            <span className={header ? 'flex flex-start' : 'w-14'}>{sightingData.duration}</span>
            {isSelected ? (
                !header ? (
                    <span className='text-xs w-3 mt-1'>▲</span>
                ) : (
                    <span></span>
                )
            ) : !header ? (
                <span className='text-xs w-3 mt-1'>▼</span>
            ) : (
                <span></span>
            )}
        </div>

        {isSelected ? (
            <div className='flex flex-row justify-evenly text-xs cursor-pointer mt-2'>
                <div className='flex flex-col justify-center w-54'>
                    <span className='mb-1 underline decoration-1 decoration-solid'>Enters Sky</span>
                    <span className='mb-3'>
                        {sightingData.approachDir}: {sightingData.approachDeg} above horizon
                    </span>
                    <span className='mb-1 underline decoration-1 decoration-solid'>
                        Max Elevation
                    </span>
                    <span className='mb-3'>{sightingData.maxElevation}° above horizon</span>
                    <span className='mb-1 underline decoration-1 decoration-solid'>Leaves Sky</span>
                    <span className='mb-3'>
                        {sightingData.departureDir}: {sightingData.departureDeg} above horizon
                    </span>
                </div>
                <div>
                    <Compass
                        entersSky={sightingData.approachDir}
                        leavesSky={sightingData.departureDir}
                    />
                </div>
            </div>
        ) : null}
    </div>
);

export default SightingCard;
