import './style.scss'
import {useState} from 'react'

const Instructions = () => {
    
    const [instructionsVisible, setInstructionsVisible] = useState(true)
    
    const instructionsHelper = () => {
        setInstructionsVisible(!instructionsVisible)
    }


    return (
        
        <>
        {instructionsVisible

        ?
        
        <div className="instructionscontainer">
            <div className="instructionsheader">
                <h1>How does this work?</h1>
            </div>

            <div className="instructionsstep">
                <p>1. Select your country & enter your zip code</p> 
            </div>
                 
            <div className="instructionsstep">
                <p>2. Select sighting day</p>
            </div>
                
            <div className="instructionsstep">
                <p>3. Read chart for how to locate</p>
            </div>
            <span onClick={instructionsHelper}>«</span>    
        </div>

        :

        <div className="instructionshidden">
            <h1 onClick={instructionsHelper}>How does this work? »</h1>
        </div>
        }
        </>
    )
}

export default Instructions