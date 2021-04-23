import { useState } from "react";

import "./style.scss";

const SightingCard = ({ sightingData, header }) => {
  const [renderDetails, setrenderDetails] = useState(false);

  const renderDetailsHelper = () => {
    !header && setrenderDetails(!renderDetails);
  };

  return (
    <div className="sightingcard" onClick={renderDetailsHelper}>
      <div className={header ? "sightingheader" : "card_overview"}>
        <span>
          {header ? sightingData.date : sightingData.date.toDateString()}
        </span>
        <span>{sightingData.time}</span>
        <span>{sightingData.duration}</span>
        <span id="sightingdownarrow">▼</span>
      </div>

      {renderDetails ? (
        <div className="card_detail">
          <span>Max Elevation: {sightingData.maxElevation}°</span>
          <span>Enters Sky: {sightingData.approach}</span>
          <span>Leaves Sky: {sightingData.departure}</span>
        </div>
      ) : null}
    </div>
  );
};

export default SightingCard;
