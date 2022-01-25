import { useState } from 'react';

const Instructions = () => {
    const [instructionsVisible, setInstructionsVisible] = useState(true);

    const instructionsHelper = () => {
        setInstructionsVisible(!instructionsVisible);
    };

    const renderInstructions = instructionsVisible ? (
        <div className='w-72 z-10 fixed top-3/4 left-8 flex flex-col rounded-md text-stone-50 text-sm font-basier bg-zinc-900 opacity-75 mt-1'>
            <div className='p-4'>
                <h2 className='underline text-center text-lg mb-2'>Instructions</h2>

                <div className='text-sm font-bold leading-5 space-y-2'>
                    <div>1. Select country & enter ZIP code.</div>
                    <div>2. Click day for sighting details.</div>
                    <div>3. Use chart to locate ISS in sky.</div>
                </div>

                <span className='ml-64 cursor-pointer text-lg' onClick={instructionsHelper}>
                    «
                </span>
            </div>
        </div>
    ) : (
        <div
            className='fixed z-10 top-3/4 left-8 rounded-md text-stone-50 bg-zinc-900 opacity-75 font-basier text-sm cursor-pointer p-2 mt-1'
            onClick={instructionsHelper}
        >
            <h2>Instructions &nbsp;»</h2>
        </div>
    );

    return renderInstructions;
};

export default Instructions;
