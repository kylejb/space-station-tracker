import './style.scss'
import {useState} from 'react'

const Faq = () => {

    const [faqVisible, setFaqVisible] = useState(false)
    
    const faqHelper = () => {
        setFaqVisible(!faqVisible)
    }

    return (
        
        <>
            {faqVisible

            ?
            
            <div className="faqcontainer">
                <div className="faqheader">
                    <h1>FAQ</h1>
                </div>

                <div className="faqquestion">
                    <p>Do I need a telescope to see the ISS?</p> 
                </div>
                <div className="faqanswer">
                    <p>No, just your eyes!</p> 
                </div>

                <div className="faqquestion">
                    <p>Why are there no sightings near me?</p>
                </div>
                <div className="faqanswer">
                    <p>We only list sightings that give you the best chance to see the station (time of day, angle, etc). Check again in a few days!</p> 
                </div>

                <div className="faqquestion">
                    <p>How do I read the sighting chart?</p>
                </div>
                <div className="faqanswer">
                    <p>Assume you are at the center of the compass. Face direction that the station will enter the sky. At the sighting time, the ISS will move across the sky in the direction of the blue arrow.</p>
                    <p>To figure out degrees above the horizon, hold your arm out straight and make a fist. The height of your fist is about 10° above the hotizon.</p> 
                </div>

                <span onClick={faqHelper}>«</span>    
            </div>

            :

            <div className="faqhidden" onClick={faqHelper}>
                <h1 >FAQ &nbsp;»</h1>
            </div>
            }
        </>
        
    )
}

export default Faq

// const Instructions = () => {
    



//     return (
        
//         <>
//         {instructionsVisible

//         ?
        
//         <div className="instructionscontainer">
//             <div className="instructionsheader">
//                 <h1>When can I see the ISS?</h1>
//             </div>

//             <div className="instructionsstep">
//                 <p>1. Select country & enter ZIP code</p> 
//             </div>
                 
//             <div className="instructionsstep">
//                 <p>2. Click day for sighting details</p>
//             </div>
                
//             <div className="instructionsstep">
//                 <p>3. Use chart to locate in sky</p>
//             </div>
//             <span onClick={instructionsHelper}>«</span>    
//         </div>

//         :

//         <div className="instructionshidden" onClick={instructionsHelper}>
//             <h1 >How does this work? &nbsp;»</h1>
//         </div>
//         }
//         </>
//     )