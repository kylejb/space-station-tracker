import './style.scss'

const SightingCard = ({ sightingData }) => {
      
    return ( 
        
        <div className="sightingcard">
            <span>{sightingData.date.toDateString()}</span>
            <span>{sightingData.time}</span>
            <span>{sightingData.duration}</span>
            <span>{sightingData.maxElevation}°</span>
            <span>{sightingData.approach}</span>
            <span>{sightingData.departure}</span>
        </div> )
}

export default SightingCard