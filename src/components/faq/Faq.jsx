import { useState } from 'react';
import './style.scss';

const Faq = () => {
    const [faqVisible, setFaqVisible] = useState(false);

    const faqHelper = () => {
        setFaqVisible(!faqVisible);
    };

    return (
        <>
            {faqVisible ? (
                <div className='faqcontainer'>
                    <div className='faqheader'>
                        <h1>FAQ</h1>
                    </div>

                    <div className='faqquestion'>
                        <p>Do I need a telescope?</p>
                    </div>
                    <div className='faqanswer'>
                        <p>No, just your eyes! The station will look like a bright, fast-moving star, but unlike an airplane, will not blink.</p>
                    </div>

                    <div className='faqquestion'>
                        <p>Why are there no sightings near me?</p>
                    </div>
                    <div className='faqanswer'>
                        <p>
                            We only list sightings that give you the best chance to see the station.
                            Check again in a few days!
                        </p>
                    </div>

                    <div className='faqquestion'>
                        <p>How do I read the sighting chart?</p>
                    </div>
                    <div className='faqanswer'>
                        <p>
                            Imagine that you are at the center of the compass. At sighting time,
                            face direction that station will enter sky. The ISS will move across the
                            sky along the blue arc.
                        </p>
                        <p>
                            To find angle above horizon, hold your arm out straight, and place the bottom of your fist on the horizon.
                            The height of one fist is about 10° above horizon.
                        </p>
                    </div>

                    <span onClick={faqHelper}>«</span>
                </div>
            ) : (
                <div className='faqhidden' onClick={faqHelper}>
                    <h1>FAQ &nbsp;»</h1>
                </div>
            )}
        </>
    );
};

export default Faq;
