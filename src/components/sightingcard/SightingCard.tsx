import Compass from 'components/compass';

import './style.scss';

const SightingCard = ({ isSelected, selectSightingCard, sightingData, header }) => (
    <div
        className='sightingcard'
        onClick={() => {
            !header && selectSightingCard();
        }}
    >
        <div className={header ? 'sightingheader' : 'card_overview'}>
            <span id={header ? 'headerdatespan' : 'datespan'}>
                {header ? sightingData.date : sightingData.date.toDateString()}
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
                            : null
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
