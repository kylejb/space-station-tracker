import { useState } from 'react';
import Compass from 'components/compass';
import './style.scss';

type SightingCardProps = {
    sightingData: any; // TODO: Update with more specific def
    header?: any; // TODO: Update with more specific def
};
const SightingCard = ({ sightingData, header }: SightingCardProps) => {
    const [renderDetails, setrenderDetails] = useState(false);

    const renderDetailsHelper = () => {
        !header && setrenderDetails(!renderDetails);
    };

    return (
        <div className='sightingcard' onClick={renderDetailsHelper}>
            <div className={header ? 'sightingheader' : 'card_overview'}>
                <span id={header ? 'headerdatespan' : 'datespan'}>
                    {header ? sightingData.date : sightingData.date.toDateString()}
                </span>
                <span id={header ? 'headertimespan' : 'timespan'}>{sightingData.time}</span>
                <span id={header ? 'headerdurationspan' : 'durationspan'}>
                    {sightingData.duration}
                </span>
                {!header ? (
                    <span
                        id='sightingdownarrow'
                        style={
                            renderDetails
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

            {renderDetails ? (
                <div className='card_detail'>
                    <span className='detail_info'>
                        <span className='detail_info_title'>Enters Sky</span>{' '}
                        <span className='detail_info_data'>
                            {sightingData.approachDir}: {sightingData.approachDeg} above horizon
                        </span>
                        <span className='detail_info_title'>Max Elevation</span>{' '}
                        <span className='detail_info_data'>
                            {' '}
                            {sightingData.maxElevation}° above horizon
                        </span>
                        <span className='detail_info_title'>Leaves Sky</span>{' '}
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
};

export default SightingCard;
