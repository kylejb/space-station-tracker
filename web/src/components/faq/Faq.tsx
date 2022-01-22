import { useState } from 'react';

const Faq = () => {
    const [faqVisible, setFaqVisible] = useState(false);

    const faqHelper = () => {
        setFaqVisible(!faqVisible);
    };

    const renderFaq = faqVisible ? (
        <div className='w-72 z-10 fixed flex flex-col bottom-1/4 left-8 bg-zinc-900 opacity-75 text-white text-sm font-basier rounded-md p-2 mb-1'>
            <div className='py-1.5 underline'>
                <h2 className='text-center text-lg'>FAQ</h2>
            </div>

            <div className='py-1 text-sm font-bold leading-5'>
                <p>Do I need a telescope?</p>
            </div>
            <div className='pb-1 pl-2 text-xs leading-5'>
                <p className='pb-1'>
                    No, just your eyes! The station will look like a bright, fast-moving star, but
                    unlike an airplane, will not blink.
                </p>
            </div>

            <div className='py-1 text-sm font-bold leading-5'>
                <p>Why are there no sightings near me?</p>
            </div>
            <div className='pb-1 pl-2 text-xs leading-5'>
                <p className='pb-1'>
                    We only list sightings that give you the best chance to see the station. Check
                    again in a few days!
                </p>
            </div>

            <div className='py-1 text-sm font-bold leading-5'>
                <p>How do I read the sighting chart?</p>
            </div>
            <div className='pb-1 pl-2 text-xs leading-5'>
                <p className='pb-1'>
                    Imagine that you are at the center of the compass. At sighting time, face
                    direction that station will enter sky. The ISS will move across the sky along
                    the blue arc.
                </p>
                <p className='pb-1'>
                    To find angle above horizon, hold your arm out straight and place the bottom of
                    your fist on the horizon. The height of one fist is about 10° above horizon.
                </p>
            </div>

            <span className='ml-64 cursor-pointer text-lg' onClick={faqHelper}>
                «
            </span>
        </div>
    ) : (
        <div
            className='z-10 fixed bottom-1/4 left-6 rounded-md text-white bg-zinc-900 opacity-75 font-basier text-sm cursor-pointer p-2 m-1'
            onClick={faqHelper}
        >
            <h2>FAQ &nbsp;»</h2>
        </div>
    );

    return renderFaq;
};

export default Faq;
