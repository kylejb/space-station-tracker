import Compass from 'components/compass';

import './style.scss';

type SightingCardProps = {
    header?: boolean;
    isSelected?: boolean;
    selectSightingCard?: (sightingCardIndex?: number) => void;
    sightingData: any;
};
const SightingCard = ({
    isSelected,
    selectSightingCard,
    sightingData,
    header = false,
}: SightingCardProps) => (
    <div
        className='sightingcard'
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
            <span id={header ? 'headertimespan' : 'timespan'}>{sightingData.time}</span>
            <span id={header ? 'headerdurationspan' : 'durationspan'}>{sightingData.duration}</span>
            {!header ? (
                <span
                    id='sightingdownarrow'
                    style={
                        isSelected
                            ? {
                                  transform: 'rotate(180deg)',
                                  paddingTop: '3px',
                                  paddingLeft: '2px',
                              }
                            : {}
                    }
                >
                    ▼
                </span>
            ) : (
                <span id='headerspacingspan'></span>
            )}
        </div>

        {isSelected ? (
            <div className='card_detail'>
                <span className='detail_info'>
                    <span className='detail_info_title'>Enters Sky</span>
                    <span className='detail_info_data'>
                        {sightingData.approachDir}: {sightingData.approachDeg} above horizon
                    </span>
                    <span className='detail_info_title'>Max Elevation</span>
                    <span className='detail_info_data'>
                        {sightingData.maxElevation}° above horizon
                    </span>
                    <span className='detail_info_title'>Leaves Sky</span>
                    <span className='detail_info_data'>
                        {sightingData.departureDir}: {sightingData.departureDeg} above horizon
                    </span>
                </span>

                <span className='detail_compass'>
                    <Compass
                        entersSky={sightingData.approachDir}
                        leavesSky={sightingData.departureDir}
                    />
                </span>
            </div>
        ) : null}
    </div>
);

export default SightingCard;
