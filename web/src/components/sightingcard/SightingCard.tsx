import Compass from 'components/compass';

type SightingCardProps = {
    key?: number;
    header?: boolean;
    isSelected?: boolean;
    selectSightingCard?: (sightingCardIndex?: number) => void;
    sightingData?: any;
};

const defaultProp = {
    date: 'DATE',
    time: 'TIME',
    duration: 'DURATION',
};

const baseStyle =
    'grid grid-cols-7 grid-flow-row auto-rows-max items-center gap-4 py-4 mx-4 font-basier text-gray-300 text-base hover:text-stone-50';

// TODO: Refactor SightingCard JSX with reusable components
const SightingCard = ({
    isSelected,
    selectSightingCard,
    sightingData = defaultProp,
    header = false,
}: SightingCardProps) => (
    <div
        className={
            header ? `${baseStyle} py-1 text-stone-50 text-lg` : `${baseStyle} cursor-pointer`
        }
        onClick={() => !header && selectSightingCard && selectSightingCard()} // TODO: refactor with appropriate type defs
    >
        <div className={header ? 'indent-4 col-span-3' : 'col-span-3'}>{sightingData.date}</div>
        <div className='col-span-2'>{sightingData.time}</div>
        <div className='col-span-2'>
            <span className='flex justify-between'>
                {sightingData.duration}
                {isSelected ? (
                    !header ? (
                        <span className='text-xs mt-1'>▲</span>
                    ) : null
                ) : !header ? (
                    <span className='text-xs mt-1'>▼</span>
                ) : null}
            </span>
        </div>
        {isSelected ? (
            <>
                <div className='col-span-3 text-sm'>
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
                <div className='col-span-4'>
                    <Compass
                        entersSky={sightingData.approachDir}
                        leavesSky={sightingData.departureDir}
                    />
                </div>
            </>
        ) : null}
    </div>
);

export default SightingCard;
