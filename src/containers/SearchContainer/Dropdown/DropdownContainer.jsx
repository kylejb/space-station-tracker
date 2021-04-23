import { useEffect, useState } from 'react';
import Select from 'react-select';
import { countryOptions } from 'data/countryOptions';
import "./style.scss";
//why didn't the import work??
import {flag, code, name, countries} from 'country-emoji';

// github link: https://github.com/meeDamian/country-emoji
// const flag = require('country-emoji');


const DropdownContainer = ({ currentUser, setCurrentUser }) => {
  const [userInput, setUserInput] = useState("");
  const [dropdownDisplay, setDropdownDisplay] = useState("none")
  const [emojiDisplay, setEmojiDisplay] = useState("block")
  const [emojiButton, setEmojiButton] = useState("🇺🇸  ▼")


  //helper function that sets user input and then finds correct emoji and fills button
  const dropdownSelectHelper = (e) => {
    setUserInput(e.value)
    
    // const emoji = "flag(e.value)"
    // setEmojiButton(`${emoji}  ▼`)
  }

  const emojiClickHandler = () => {
    setDropdownDisplay("block")
    setEmojiDisplay("none")
  }

  const dropDownChangeHandler = () => {
    setDropdownDisplay("none")
    setEmojiDisplay("block")
  }

  useEffect(() => {
    setCurrentUser({country: userInput.replace(" ", "_")})
  }, [userInput, setCurrentUser]);

  useEffect(() => {
    dropDownChangeHandler()
  }, [userInput]
  );

  const customStyles = {
    // container: (provided, state) => ({
    //   ...provided,
    //   width: '65px',
    // }),
    // singleValue: (provided, state) => ({
    //   ...provided,
    //   width: '50px'
    // }),
    // option: (provided, state) => ({
    //   ...provided,
    //   width: '50px'
    // })
    control: (provided, state) => ({
      ...provided,
      width: 180,
      height: 25,
      // minHeight: 25
    }),
    menu:(provided, state) => ({
      ...provided,
      width: 180,
      minHeight: 25
    }),
  }

  return (
    <div className="dropdown-container">
      <div style={{display: `${dropdownDisplay}`}}>
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
    <input type="button" value={emojiButton} id="emojidropdown" style={{display: `${emojiDisplay}`}} onClick={emojiClickHandler}></input>
    </div>
  );
}

export default DropdownContainer;
