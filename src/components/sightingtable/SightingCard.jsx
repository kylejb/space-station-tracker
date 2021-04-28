import './style.scss'
import {useState} from 'react'

const SightingCard = ({ sightingData }) => {
const [renderDetails, setrenderDetails] = useState(false)

const renderDetailsHelper = () => {
  setrenderDetails(!renderDetails)
}

    return ( 
        
        <div className="sightingcard" onClick={renderDetailsHelper}>
              <div className="card_overview">
                <span>{sightingData.date.toDateString()}</span>
                <span>{sightingData.time}</span>
                <span>{sightingData.duration}</span>
              </div>
              {renderDetails 
                ? 
              <div className="card_detail">
                <span>{sightingData.maxElevation}°</span>
                <span>{sightingData.approach}</span>
                <span>{sightingData.departure}</span>
              </div>
                :
              null
    
              }
        </div> 
        )
}

export default SightingCard