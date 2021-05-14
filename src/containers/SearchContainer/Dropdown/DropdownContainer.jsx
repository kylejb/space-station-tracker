import { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { countryEmojis } from 'common/data/countryEmojis';
import { countryOptions } from 'common/data/countryOptions';
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
        setEmojiValue(`${countryEmojis(e.value)}  ▼`);
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
            width: 170,
            minHeight: 25,
            borderRadius: "5px 0px 0px 5px",
            background: "rgba(27,29,33,0.75)",
            border: "1px solid rgba(198,198,197,0.84)",
            boxShadow: "inset 0px 0px 3px 2px #4287f5",
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            width: 170,
            minHeight: 48,
            color: "#C6C6C5",
            opacity: "1",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "#C6C6C5",
            opacity: "1",
            fontFamily: "Basier",
            paddingLeft: "10px",
            letterSpacing: ".05em",
            fontSize: ".8em",
        }),
        input: (provided, state) => ({
            ...provided,
            color: "#C6C6C5",
            opacity: "1",
            fontFamily: "Basier",
            paddingLeft: "10px",
            letterSpacing: ".05em",
            fontSize: ".8em",
        }),
        menu: (provided, state) => ({
            ...provided,
            width: 170,
            minHeight: 25,
            marginTop: "3px",
            background: "rgba(27,29,33,0.95)",
            color: "#C6C6C5",
            border: "1px solid rgba(198,198,197,0.84)",
        }),
        menuList: (provided, state) => ({
            ...provided,
            borderRadius: "5px 0px 0px 5px",
            background: "rgba(27,29,33,0.75)",
            color: "#C6C6C5",
            fontFamily: "Basier",
            fontSize: ".9em",
        }),
        menuItem: (provided, state) => ({
            ...provided,
            borderRadius: "5px 0px 0px 5px",
            background: "rgba(27,29,33,0.75)",
            color: "#C6C6C5",
        }),
        option: (provided, state) => ({
            ...provided,
            borderRadius: "0px 0px 0px 0px",
            color: "#C6C6C5",
            background: state.isFocused ? "#4287f5" : "rgba(27,29,33,0.75)",
        }),
    }

    useEffect(() => {
        if (currentUser.country === "") {
            setEmojiValue("🇺🇸 ▼" );
        } else {
            setEmojiValue(`${countryEmojis(currentUser.country)} ▼`);
        }
    },[currentUser]);

    useEffect(() => {
        setCurrentUser({country: userInput.replace(" ", "_")});
        setIsDropdownOpen(false);
    }, [userInput, setCurrentUser]);


    return (
        <div className="dropdown-container">
            <Select
                className="react-select-component"
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
