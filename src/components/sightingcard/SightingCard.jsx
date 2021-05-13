import { useState } from 'react';
import './style.scss';
import Compass from 'components/compass'


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
                {!header ? <span id="sightingdownarrow" style={renderDetails ? {transform: "rotate(180deg)"} : null}>▼</span> : <span id="headerspacingspan"></span>}
            </div>

            {renderDetails
                ?
                    <div className="card_detail">
                        <span className="detail_info">
                            <span className="detail_info_title">Enters Sky</span> <span className="detail_info_data">{sightingData.approachDir}: {sightingData.approachDeg} above horizon</span>
                            <span className="detail_info_title">Max Elevation</span> <span className="detail_info_data"> {sightingData.maxElevation}° above horizon</span>
                            <span className="detail_info_title">Leaves Sky</span> <span className="detail_info_data">{sightingData.departureDir}: {sightingData.departureDeg} above horizon</span>
                        </span>

                        <span className="detail_compass">
                            <Compass
                                entersSky={sightingData.approachDir}
                                leavesSky={sightingData.departureDir}
                            />
                        </span>
                    </div>
                :
                    null
            }
        </div>
    )
}

export default SightingCard;