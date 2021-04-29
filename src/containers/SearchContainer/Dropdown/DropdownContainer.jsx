import { useEffect, useState, useRef } from 'react';
import Select, { components } from 'react-select';
import { flag } from 'country-emoji';
import { countryOptions } from 'data/countryOptions';
import './style.scss';

// TODO - Possible Refactor: https://github.com/JedWatson/react-select/issues/4279#issuecomment-740081627
const Option = ({ data, ...otherProps }) => {
    return (
        <components.Option {...otherProps}>
            <div>{data.label}</div>
        </components.Option>
    );
}

const Control = ({ children, ...props }) => {
    const { emoji, getCountryEmoji } = props.selectProps;

    const onClick = () => console.log('controlledClick', document.activeElement);
    const getClickFocus = (e) => {
        e.target.focus();
        getCountryEmoji(e);
        onClick();
    };

    return (
        <components.Control {...props}>
            <span onMouseDown={getClickFocus}>

            {/* <input
                id="emojidropdown"
                // style={{display: isCountryDropdownClicked ? "none" : "block"}}
                type="button"
                value={emoji}
                onClick={getClickFocus}
            /> */}
                {emoji}
            </span>
            {children}
            {/* <button onClick={getClickFocus}>Focused</button> */}
        </components.Control>
    );
}


const DropdownContainer = ({ currentUser, setCurrentUser }) => {
    const [userInput, setUserInput] = useState("");
    const [isCountryDropdownClicked, setIsCountryDropdownClicked] = useState(null);
    const [emojiValue, setEmojiValue] = useState("🇺🇸  ▼");
    const selectRef = useRef(null);

    const dropdownSelectHelper = (e) => {
        setUserInput(e.value);
        const emoji = flag(e.value.replace("_", " "));
        setEmojiValue(`${emoji}  ▼`);
    }

    // setTimeout(() => selectRef.current.focus(), 1000);
    // selectRef.current should be accessed after state is changed
    const emojiClickHandler = () => {
        //! await seems to have the desired effect despite object not being a Promise
        setIsCountryDropdownClicked(!isCountryDropdownClicked);
        // selectRef.current.focus();
    }

    /**
     *
     * @{param} SyntheticKeyboardEvent
     */
    const keyDownHandler = (e) => {
        switch (e.key) {
            case "Escape":
                // hardcoded to guarantee exit
                setIsCountryDropdownClicked(false);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setCurrentUser({country: userInput.replace(" ", "_")});
        setIsCountryDropdownClicked(false);
    }, [userInput, setCurrentUser]);

    // display: isCountryDropdownClicked ? "none" : "block",
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: isCountryDropdownClicked ? 180 : null,
            minHeight: 25,
        }),
        menu: (provided, state) => ({
            ...provided,
            width: 180,
            minHeight: 25,
        }),
    }

    const onClick = (e) => {
        emojiClickHandler(e);
    }

    return (
        <div className="dropdown-container">
            <Select
                blurInputOnSelect
                openMenuOnFocus
                ref={selectRef}
                emoji={emojiValue}
                getCountryEmoji={onClick}
                options={countryOptions}
                components={{
                    Option,
                    Control,
                    DropdownIndicator:() => null,
                    IndicatorSeparator:() => null,
                }}
                styles={customStyles}
                onChange={dropdownSelectHelper}
                onKeyDown={keyDownHandler}
                value={countryOptions.find(country => (
                    (country.value === userInput) || (country.value === currentUser.country)
                ))}
            />
        </div>
    );
}

export default DropdownContainer;
