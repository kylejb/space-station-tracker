import { type JSX, type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import Select, { type SelectInstance, type SingleValue } from 'react-select';

import { TAB_INDEX } from '@common/constants';
import { countryEmojis } from '@common/data/countryEmojis';
import { countryOptions } from '@common/data/countryOptions';

interface DropdownContainerProps {
    currentUser: {
        country: string;
        countryCode: string;
    };
    setCurrentUser: (user: { country: string; status: string; countryCode: string }) => void;
}

function DropdownContainer({ currentUser, setCurrentUser }: DropdownContainerProps): JSX.Element {
    const [userInput, setUserInput] = useState({
        country: 'United_States',
        countryCode: 'us',
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [emojiValue, setEmojiValue] = useState('🇺🇸   ');
    const selectRef = useRef<SelectInstance<(typeof countryOptions)[number]>>(null);

    const dropdownSelectHelper = (evt: SingleValue<(typeof countryOptions)[number]>): void => {
        if (evt) {
            setUserInput({ country: evt.value, countryCode: evt.iso2Code });
            setEmojiValue(`${countryEmojis[evt.value]}   `);
        }
    };

    const emojiClickHandler = (): void => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    useEffect(() => {
        if (isDropdownOpen && selectRef.current) {
            selectRef.current.focus();
        }
    }, [isDropdownOpen]);

    const keyDownHandler = useCallback((evt: KeyboardEvent): void => {
        switch (evt.key) {
            case 'ArrowDown':
            case 'Enter':
                setIsDropdownOpen(true);
                break;
            case 'Escape':
                // hardcoded to guarantee exit
                setIsDropdownOpen(false);
                break;
            default:
                break;
        }
    }, []);

    // TODO: Ensure customStyles matches with theme set via Tailwindcss (i.e., color, text size, font family).
    const customStyles = {
        container: (provided: Record<string, unknown>) => ({
            ...provided,
            display: isDropdownOpen ? 'block' : 'none',
        }),
        control: (provided: Record<string, unknown>) => ({
            ...provided,
            width: 170,
            height: 48,
            borderRadius: '5px 0px 0px 5px',
            background: 'rgba(27,29,33,0.75)',
            border: '1px solid rgba(198,198,197,0.84)',
            boxShadow: 'inset 0px 0px 3px 2px #4287f5',
        }),
        valueContainer: (provided: Record<string, unknown>) => ({
            ...provided,
            width: 170,
            minHeight: 48,
            color: '#C6C6C5',
            opacity: '1',
        }),
        singleValue: (provided: Record<string, unknown>) => ({
            ...provided,
            color: '#C6C6C5',
            opacity: '1',
            fontFamily: 'Basier Circular',
            paddingLeft: '10px',
            letterSpacing: '.05em',
            fontSize: '.8em',
        }),
        input: (provided: Record<string, unknown>) => ({
            ...provided,
            color: '#C6C6C5',
            opacity: '1',
            fontFamily: 'Basier Circular',
            paddingLeft: '10px',
            letterSpacing: '.05em',
            fontSize: '.8em',
        }),
        menu: (provided: Record<string, unknown>) => ({
            ...provided,
            width: 170,
            minHeight: 25,
            marginTop: '3px',
            background: 'rgba(27,29,33,0.95)',
            color: '#C6C6C5',
            border: '1px solid rgba(198,198,197,0.84)',
        }),
        menuList: (provided: Record<string, unknown>) => ({
            ...provided,
            borderRadius: '5px 0px 0px 5px',
            background: 'rgba(27,29,33,0.75)',
            color: '#C6C6C5',
            fontFamily: 'Basier Circular',
            fontSize: '.9em',
        }),
        option: (provided: Record<string, unknown>, state: { isFocused: boolean }) => ({
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
        <div className="h-full">
            <Select
                ref={selectRef}
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
                        country.iso2Code === userInput.countryCode ||
                        country.value === currentUser.country,
                )}
            />
            <span
                className="font-basier cursor-pointer pointer-events-auto text-gray-900 bg-neutral-400 hover:bg-stone-600 z-10"
                onClick={emojiClickHandler}
                role="listbox"
                onKeyDown={keyDownHandler}
                tabIndex={TAB_INDEX.dropdownContainer}
            >
                <input
                    type="button"
                    style={{ display: isDropdownOpen ? 'none' : 'block' }}
                    className="h-full w-20 text-3xl px-2 rounded-l-md border-none bg-inherit text-inherit cursor-pointer pointer-events-auto"
                    value={emojiValue}
                />
                <span
                    className="h-0 w-20 text-xs relative left-14 bottom-8"
                    style={{ display: isDropdownOpen ? 'none' : 'block' }}
                >
                    ▼
                </span>
            </span>
        </div>
    );
}

export default DropdownContainer;
