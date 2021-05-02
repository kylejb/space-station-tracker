import { useState } from 'react';
import './style.scss';

/*  prop.header is temporarily being used to make SightingCard reusable
    if header, click should be disabled and we are not receiving a date object
    all else is won't conflict
*/
const SightingCard = ({ sightingData, header }) => {
    const [renderDetails, setrenderDetails] = useState(false);

    const renderDetailsHelper = () => {
        !header && setrenderDetails(!renderDetails);
    }

    return (
        <div className="sightingcard" onClick={renderDetailsHelper}>
            <div className={header ? "sightingheader" : "card_overview"}>
                <span>{header ? sightingData.date : sightingData.date.toDateString()}</span>
                <span>{sightingData.time}</span>
                <span>{sightingData.duration}</span>
                {!header ? <span id="sightingdownarrow">▼</span> : null}
            </div>

            {renderDetails
                ?
                    <div className="card_detail">
                        <span>Max Elevation: {sightingData.maxElevation}°</span>
                        <span>Enters Sky: {sightingData.approach}</span>
                        <span>Leaves Sky: {sightingData.departure}</span>
                    </div>
                :
                    null
            }
        </div>
    )
}

export default SightingCard;
