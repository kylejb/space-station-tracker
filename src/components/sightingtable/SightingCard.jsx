import './style.scss'
import {useState} from 'react'

const SightingCard = ({ sightingData }) => {
const [renderDetails, setrenderDetails] = useState(false)

const renderDetailsHelper = () => {
  setrenderDetails(!renderDetails)
}

// const headerData = {
//   date: "Date", time: "Time", duration: "Duration"
// }


    return ( 
        //Ternary for rendering table header - may want to break out as its own component  
        <>
          {sightingData.date === "Date"
            ?
            <div id="sightingheader">
                  <span>{sightingData.date}</span>
                  <span>{sightingData.time}</span>
                  <span>{sightingData.duration}</span>
            </div>
            :      
          <div className="sightingcard" onClick={renderDetailsHelper}>
                <div className="card_overview">
                  <span>{sightingData.date.toDateString()}</span>
                  <span>{sightingData.time}</span>
                  <span>{sightingData.duration}</span>
                  <span id="sightingdownarrow">▼</span>
                  
                  {/* 
                    Down carrot from weather site - needs styling and to be flipped
                    <svg role="img" viewBox="0 0 24 24">
                    <title>Arrow Down</title>
                    <path d="M12 16.086l7.293-7.293a1 1 0 1 1 1.414 1.414l-8 8a1 1 0 0 1-1.414 0l-8-8a1 1 0 1 1 1.414-1.414L12 16.086z"></path>
                  </svg> */}
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
      
        }
        </>

        )
}

export default SightingCard