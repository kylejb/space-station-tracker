import { useEffect, useState } from 'react';
import Select from 'react-select';
import { flag } from 'country-emoji';
import { countryOptions } from 'data/countryOptions';
import './style.scss';


const DropdownContainer = ({ currentUser, setCurrentUser }) => {
  const [userInput, setUserInput] = useState("");
  const [isCountryDropdownClicked, setIsCountryDropdownClicked] = useState(null);
  const [emojiValue, setEmojiValue] = useState("🇺🇸  ▼");


  const dropdownSelectHelper = (e) => {
    setUserInput(e.value)
    let emoji = flag(e.value.replace("_", " "))
    setEmojiValue(`${emoji}  ▼`)
  }

  const emojiClickHandler = () => {
    setIsCountryDropdownClicked(!isCountryDropdownClicked)
  }

  const dropDownChangeHandler = () => {
    setIsCountryDropdownClicked(!isCountryDropdownClicked)
  }

  useEffect(() => {
    setCurrentUser({country: userInput.replace(" ", "_")});
    dropDownChangeHandler();
  }, [userInput, setCurrentUser]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 180,
      height: 25,
    }),
    menu:(provided, state) => ({
      ...provided,
      width: 180,
      minHeight: 25
    }),
  }

  return (
    <div className="dropdown-container">
      <div className="select-wrapper">
        <Select
          value={countryOptions.find(country => (
            (country.value === userInput) || (country.value === currentUser.country)
          ))}
          options={countryOptions}
          onChange={(e) => dropdownSelectHelper(e)}
          placeholder="Country"
          styles={customStyles}
        />
      </div>
    <input type="button" value={emojiValue} id="emojidropdown" onClick={emojiClickHandler}></input>
    </div>
  );
}

export default DropdownContainer;
