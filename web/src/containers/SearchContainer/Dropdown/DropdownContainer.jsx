import Select from 'react-select';
import { useEffect, useState, useRef } from 'react';

import { countryEmojis } from 'common/data/countryEmojis';
import { countryOptions } from 'common/data/countryOptions';

const DropdownContainer = ({ currentUser, setCurrentUser }) => {
    const [userInput, setUserInput] = useState({ country: 'United_States', countryCode: 'us' });
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);
    const [emojiValue, setEmojiValue] = useState('🇺🇸   ');
    const selectRef = useRef(null);

    const dropdownSelectHelper = (e) => {
        setUserInput({ country: e.value, countryCode: e.iso2Code });
        setEmojiValue(`${countryEmojis[e.value]}   `);
    };

    const emojiClickHandler = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        if (isDropdownOpen) {
            selectRef.current.focus();
        }
    }, [isDropdownOpen]);

    /**
     *
     * @{param} SyntheticKeyboardEvent
     */
    const keyDownHandler = (e) => {
        switch (e.key) {
            case 'Escape':
                // hardcoded to guarantee exit
                setIsDropdownOpen(false);
                break;
            default:
                break;
        }
    };

    const customStyles = {
        container: (provided, state) => ({
            ...provided,
            display: isDropdownOpen ? 'block' : 'none',
        }),
        control: (provided, state) => ({
            ...provided,
            width: 170,
            minHeight: 25,
            borderRadius: '5px 0px 0px 5px',
            background: 'rgba(27,29,33,0.75)',
            border: '1px solid rgba(198,198,197,0.84)',
            boxShadow: 'inset 0px 0px 3px 2px #4287f5',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            width: 170,
            minHeight: 48,
            color: '#C6C6C5',
            opacity: '1',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#C6C6C5',
            opacity: '1',
            fontFamily: 'Basier Circular',
            paddingLeft: '10px',
            letterSpacing: '.05em',
            fontSize: '.8em',
        }),
        input: (provided, state) => ({
            ...provided,
            color: '#C6C6C5',
            opacity: '1',
            fontFamily: 'Basier Circular',
            paddingLeft: '10px',
            letterSpacing: '.05em',
            fontSize: '.8em',
        }),
        menu: (provided, state) => ({
            ...provided,
            width: 170,
            minHeight: 25,
            marginTop: '3px',
            background: 'rgba(27,29,33,0.95)',
            color: '#C6C6C5',
            border: '1px solid rgba(198,198,197,0.84)',
        }),
        menuList: (provided, state) => ({
            ...provided,
            borderRadius: '5px 0px 0px 5px',
            background: 'rgba(27,29,33,0.75)',
            color: '#C6C6C5',
            fontFamily: 'Basier Circular',
            fontSize: '.9em',
        }),
        menuItem: (provided, state) => ({
            ...provided,
            borderRadius: '5px 0px 0px 5px',
            background: 'rgba(27,29,33,0.75)',
            color: '#C6C6C5',
        }),
        option: (provided, state) => ({
            ...provided,
            borderRadius: '0px 0px 0px 0px',
            color: '#C6C6C5',
            background: state.isFocused ? '#4287f5' : 'rgba(27,29,33,0.75)',
        }),
    };

    useEffect(() => {
        if (currentUser.country === '') {
            setEmojiValue('🇺🇸  ');
        } else {
            setEmojiValue(`${countryEmojis[currentUser.country]}  `);
        }
    }, [currentUser]);

    useEffect(() => {
        setCurrentUser({
            country: userInput.country.replace(' ', '_'),
            status: 'DROPDOWN_INPUT',
            countryCode: userInput.countryCode,
        });
        setIsDropdownOpen(false);
    }, [userInput, setCurrentUser]);

    return (
        <div className='dropdown-container'>
            <Select
                ref={selectRef}
                className='react-select-component'
                blurInputOnSelect
                openMenuOnFocus
                styles={customStyles}
                options={countryOptions}
                menuIsOpen={isDropdownOpen}
                onChange={dropdownSelectHelper}
                onKeyDown={keyDownHandler}
                onBlur={() => setIsDropdownOpen(false)}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                }}
                value={countryOptions.find(
                    (country) =>
                        country.value === userInput || country.value === currentUser.country,
                )}
            />
            <span
                className='font-basier cursor-pointer pointer-events-none text-gray-900 bg-neutral-400 hover:bg-stone-600 z-10'
                onClick={emojiClickHandler}
            >
                <input
                    type='button'
                    style={{ display: isDropdownOpen ? 'none' : 'block' }}
                    className='h-11 w-20 text-5xl px-2 rounded-l-md border-none bg-inherit text-inherit pointer-events-auto'
                    value={emojiValue}
                />
                <span
                    className='h-0 w-20 text-base relative left-14 bottom-6 pointer-events-auto'
                    style={{ display: isDropdownOpen ? 'none' : 'block' }}
                >
                    ▼
                </span>
            </span>
        </div>
    );
};

export default DropdownContainer;
