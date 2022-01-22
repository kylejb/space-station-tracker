import { useState } from 'react';

const Instructions = () => {
    const [instructionsVisible, setInstructionsVisible] = useState(true);

    const instructionsHelper = () => {
        setInstructionsVisible(!instructionsVisible);
    };

    const renderInstructions = instructionsVisible ? (
        <div className='w-72 z-10 fixed top-3/4 left-8 flex flex-col rounded-md text-white text-sm font-basier bg-zinc-900 opacity-75'>
            <div className='py-1.5 underline'>
                <h2 className='text-center text-lg'>Instructions</h2>
            </div>

            <div className='py-1 px-4 text-sm font-bold leading-5 space-y-2'>
                <div>1. Select country & enter ZIP code.</div>
                <div>2. Click day for sighting details.</div>
                <div>3. Use chart to locate ISS in sky.</div>
            </div>

            <span className='ml-64 cursor-pointer text-lg' onClick={instructionsHelper}>
                «
            </span>
        </div>
    ) : (
        <div
            className='fixed z-10 top-3/4 left-6 rounded-md text-white bg-zinc-900 opacity-75 font-basier text-sm cursor-pointer m-1 p-2'
            onClick={instructionsHelper}
        >
            <h2>Instructions &nbsp;»</h2>
        </div>
    );

    return renderInstructions;
};

export default Instructions;
