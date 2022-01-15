import { useState } from 'react';
import './style.scss';

const Instructions = () => {
    const [instructionsVisible, setInstructionsVisible] = useState(true);

    const instructionsHelper = () => {
        setInstructionsVisible(!instructionsVisible);
    };

    return (
        <>
            {instructionsVisible ? (
                <div className='instructionscontainer'>
                    <div className='instructionsheader'>
                        <h1>Instructions</h1>
                    </div>

                    <div className='instructionsstep'>
                        <p>1. Select country & enter ZIP code.</p>
                    </div>

                    <div className='instructionsstep'>
                        <p>2. Click day for sighting details.</p>
                    </div>

                    <div className='instructionsstep'>
                        <p>3. Use chart to locate ISS in sky.</p>
                    </div>
                    <span onClick={instructionsHelper}>«</span>
                </div>
            ) : (
                <div className='instructionshidden' onClick={instructionsHelper}>
                    <h1>Instructions &nbsp;»</h1>
                </div>
            )}
        </>
    );
};

export default Instructions;
