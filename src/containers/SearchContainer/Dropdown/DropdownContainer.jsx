import { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { flag } from 'country-emoji';
import { countryOptions } from 'data/countryOptions';
import './style.scss';

// TODO - Possible Refactor: https://github.com/JedWatson/react-select/issues/4279#issuecomment-740081627
// const Option = ({ data, ...otherProps }) => {
//     return (
//         <components.Option {...otherProps}>
//             <div>{data.label}</div>
//         </components.Option>
//     );
// }

// const Control = ({ children, ...props }) => {
//     const { emoji, getCountryEmoji } = props.selectProps;

//     const onClick = () => console.log('controlledClick', document.activeElement);
//     const getClickFocus = (e) => {
//         e.target.focus();
//         getCountryEmoji(e);
//         onClick();
//     };

//     return (
//         <components.Control {...props}>
//             <span onMouseDown={getClickFocus}>

//             {/* <input
//                 id="emojidropdown"
//                 // style={{display: isDropdownOpen ? "none" : "block"}}
//                 type="button"
//                 value={emoji}
//                 onClick={getClickFocus}
//             /> */}
//                 {emoji}
//             </span>
//             {children}
//             {/* <button onClick={getClickFocus}>Focused</button> */}
//         </components.Control>
//     );
// }


const DropdownContainer = ({ currentUser, setCurrentUser }) => {
    const [userInput, setUserInput] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);
    const [emojiValue, setEmojiValue] = useState("🇺🇸  ▼");
    const selectRef = useRef(null);

    const dropdownSelectHelper = (e) => {
        setUserInput(e.value);
        const emoji = flag(e.value.replace("_", " "));
        setEmojiValue(`${emoji}  ▼`);
    }

    // selectRef.current should be accessed after state is changed
    const emojiClickHandler = () => {
        //! await seems to have the desired effect despite object not being a Promise
        setIsDropdownOpen(!isDropdownOpen);
        // selectRef.current.focus();
    }

    useEffect(() => {
        if (isDropdownOpen) {
            selectRef.current.focus()
        }
    },[isDropdownOpen]);


    /**
     *
     * @{param} SyntheticKeyboardEvent
     */
    const keyDownHandler = (e) => {
        switch (e.key) {
            case "Escape":
                // hardcoded to guarantee exit
                setIsDropdownOpen(false);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setCurrentUser({country: userInput.replace(" ", "_")});
        setIsDropdownOpen(false);
    }, [userInput, setCurrentUser]);


    const customStyles = {
        container: (provided, state) => ({
            ...provided,
            display: isDropdownOpen ? "block" : "none",
        }),
        control: (provided, state) => ({
            ...provided,
            width: 180,
            minHeight: 25,
        }),
        menu: (provided, state) => ({
            ...provided,
            width: 180,
            minHeight: 25,
        }),
    }

    useEffect(() => {
        if (currentUser.country === "") {
            setEmojiValue("🇺🇸  ▼" );
        } else {
            const emoji = flag(currentUser.country.replace("_", " "));
            setEmojiValue(`${emoji}  ▼`);
        }
    },[currentUser]);

    useEffect(() => {
        setCurrentUser({country: userInput.replace(" ", "_")});
        setIsDropdownOpen(false);
    }, [userInput, setCurrentUser]);


    return (
        <div className="dropdown-container">
            <Select
                blurInputOnSelect
                openMenuOnFocus
                ref={selectRef}
                menuIsOpen={isDropdownOpen}
                options={countryOptions}
                components={{
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

            <input
                type="button"
                style={{display: isDropdownOpen ? "none" : "block"}}
                id="emojidropdown"
                value={emojiValue}
                onClick={emojiClickHandler}
            />
        </div>
    );
}

export default DropdownContainer;
