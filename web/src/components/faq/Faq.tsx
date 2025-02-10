import { type JSX, KeyboardEvent, useCallback, useState } from 'react';

import { TAB_INDEX } from '@common/constants';

function Faq(): JSX.Element {
    const [faqVisible, setFaqVisible] = useState(false);

    const faqHelper = useCallback(() => {
        setFaqVisible(!faqVisible);
    }, [faqVisible]);

    const keyDownHandler = useCallback(
        () =>
            (e: KeyboardEvent): void => {
                switch (e.key) {
                    case 'ArrowDown':
                        faqHelper();
                        break;
                    case 'Enter':
                        faqHelper();
                        break;
                    case 'Escape':
                        // hardcoded to guarantee exit
                        faqHelper();
                        break;
                    default:
                        break;
                }
            },
        [faqHelper],
    );

    const renderFaq = faqVisible ? (
        <div className="w-80 z-10 gap-2 fixed flex flex-col bottom-1/4 left-8 bg-zinc-900 opacity-75 text-stone-50 font-basier rounded-xl mb-1">
            <div className="p-4 space-y-1.5">
                <h2 className="underline text-center text-lg">FAQ</h2>

                <div className="text-base font-bold leading-5">
                    <p>Do I need a telescope?</p>
                </div>
                <div className="text-sm leading-5">
                    <p className="ml-2">
                        No, just your eyes! The station will look like a bright, fast-moving star,
                        but unlike an airplane, will not blink.
                    </p>
                </div>

                <div className="text-base font-bold leading-5">
                    <p>Why are there no sightings near me?</p>
                </div>
                <div className="text-sm leading-5">
                    <p className="ml-2">
                        Check again in a few days! We only list sightings that give you the best
                        chance to see the station.
                    </p>
                </div>

                <div className="text-base font-bold leading-5">
                    <p>How do I read the sighting chart?</p>
                </div>
                <div className="text-sm leading-5 space-y-1">
                    <p className="ml-2">
                        Imagine that you are at the center of the compass. At sighting time, face
                        direction that station will enter sky. The ISS will move across the sky
                        along the blue arc.
                    </p>
                    <p className="ml-2">
                        To find angle above horizon, hold your arm out straight and place the bottom
                        of your fist on the horizon. The height of one fist is about 10° above
                        horizon.
                    </p>
                    <span
                        className="flex justify-end cursor-pointer text-lg"
                        onClick={faqHelper}
                        role="button"
                        tabIndex={TAB_INDEX.faqClose}
                        onKeyDown={keyDownHandler}
                    >
                        «
                    </span>
                </div>
            </div>
        </div>
    ) : (
        <div
            className="z-10 fixed bottom-1/4 left-8 rounded-xl text-stone-50 bg-zinc-900 opacity-75 font-basier text-base cursor-pointer p-2.5 mb-1"
            onClick={faqHelper}
            role="button"
            onKeyDown={keyDownHandler}
            tabIndex={TAB_INDEX.faqOpen}
        >
            <h2>FAQ &nbsp;»</h2>
        </div>
    );

    return renderFaq;
}

export default Faq;
