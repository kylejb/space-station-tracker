import { TAB_INDEX } from 'common/constants';
import { KeyboardEvent, useCallback, useState } from 'react';

function Instructions(): JSX.Element {
    const [instructionsVisible, setInstructionsVisible] = useState(true);

    const instructionsHelper = useCallback(() => {
        setInstructionsVisible(!instructionsVisible);
    }, [instructionsVisible]);

    const keyDownHandler = useCallback(
        () =>
            (e: KeyboardEvent): void => {
                switch (e.key) {
                    case 'ArrowDown':
                        instructionsHelper();
                        break;
                    case 'Enter':
                        instructionsHelper();
                        break;
                    case 'Escape':
                        // hardcoded to guarantee exit
                        instructionsHelper();
                        break;
                    default:
                        break;
                }
            },
        [instructionsHelper],
    );

    const renderInstructions = instructionsVisible ? (
        <div className='w-80 z-10 fixed top-3/4 left-8 flex flex-col rounded-xl text-stone-50 text-sm font-basier bg-zinc-900 opacity-75 mt-1'>
            <div className='p-4'>
                <h2 className='underline text-center text-lg mb-2'>Instructions</h2>

                <div className='text-sm font-bold leading-5 space-y-2'>
                    <div>1. Select country &#38; enter ZIP code.</div>
                    <div>2. Click day for sighting details.</div>
                    <div>3. Use chart to locate ISS in sky.</div>
                </div>

                <span
                    className='flex justify-end cursor-pointer text-lg'
                    onClick={instructionsHelper}
                    onKeyDown={keyDownHandler}
                    role='button'
                    tabIndex={TAB_INDEX.instructionsClose}
                >
                    «
                </span>
            </div>
        </div>
    ) : (
        <div
            className='fixed z-10 top-3/4 left-8 rounded-xl text-stone-50 bg-zinc-900 opacity-75 font-basier text-base cursor-pointer p-2.5 mt-1'
            onClick={instructionsHelper}
            onKeyDown={keyDownHandler}
            role='button'
            tabIndex={TAB_INDEX.instructionsOpen}
        >
            <h2>Instructions &nbsp;»</h2>
        </div>
    );

    return renderInstructions;
}

export default Instructions;
