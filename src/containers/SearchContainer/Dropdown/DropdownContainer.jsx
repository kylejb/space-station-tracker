import { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { flag } from 'country-emoji';
import { countryOptions } from 'data/countryOptions';
import './style.scss';


const DropdownContainer = ({ currentUser, setCurrentUser }) => {
  const [userInput, setUserInput] = useState("");
  const [isCountryDropdownClicked, setIsCountryDropdownClicked] = useState(null);
  const [emojiValue, setEmojiValue] = useState("🇺🇸  ▼");
  const selectRef = useRef(null);

  const dropdownSelectHelper = (e) => {
    setUserInput(e.value)
    const emoji = flag(e.value.replace("_", " "))
    setEmojiValue(`${emoji}  ▼`)
  }

  // setTimeout(() => selectRef.current.focus(), 1000);
  // selectRef.current should be accessed after state is changed
  const emojiClickHandler = async () => {
    //! await seems to have the desired effect despite object not being a Promise
    await setIsCountryDropdownClicked(!isCountryDropdownClicked);
    selectRef.current.focus();
  }

  /**
   * Parameters:
   * SyntheticKeyboardEvent
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

  const customStyles = {
    container: (provided, state) => ({
        ...provided,
        display: isCountryDropdownClicked ? "block" : "none",
        focus: true,
    }),
    control: (provided, state) => ({
      ...provided,
      width: 180,
      height: 25,
    }),
    menu: (provided, state) => ({
      ...provided,
      width: 180,
      minHeight: 25,
    }),
}

    return (
        <div className="dropdown-container">
            <Select
                ref={selectRef}
                options={countryOptions}
                styles={customStyles}
                placeholder="Country"
                openMenuOnFocus
                onChange={dropdownSelectHelper}
                onKeyDown={keyDownHandler}
                value={countryOptions.find(country => (
                    (country.value === userInput) || (country.value === currentUser.country)
                ))}
            />

            <input
                id="emojidropdown"
                style={{display: isCountryDropdownClicked ? "none" : "block"}}
                type="button"
                value={emojiValue}
                onClick={emojiClickHandler}
            />
        </div>
    );
}

export default DropdownContainer;
