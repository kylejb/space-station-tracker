import { useEffect, useState, useRef, forwardRef } from 'react';
import Select from 'react-select';
import { countryOptions } from 'data/countryOptions';
import "./style.scss";
import {flag} from "country-emoji"


const DropdownContainer = ({ currentUser, setCurrentUser }) => {
  const [userInput, setUserInput] = useState("");
  const selectRef = useRef(null)
  const [isCountryClicked, setIsCountryClicked] = useState(false)
  const [emojiButton, setEmojiButton] = useState(null)
  

  const dropdownSelectHelper = (e) => {
    setUserInput(e.value)
    let emoji = flag(e.value.replace("_", " "))
    setEmojiButton(`${emoji}  ▼`)
  }

  const emojiClickHandler = () => {
    setIsCountryClicked(true)
  }

  const dropDownChangeHandler = () => {
    setIsCountryClicked(false)
    
  }

  useEffect(() => {
    if(isCountryClicked){
      selectRef.current.focus()
    }
  },[isCountryClicked])

  useEffect(() => {
    if(currentUser.country === ""){
      setEmojiButton("🇺🇸  ▼" )
    } else {
      let emoji = flag(currentUser.country.replace("_", " "))
      setEmojiButton(`${emoji}  ▼`)
    }
  },[currentUser])

  useEffect(() => {
    setCurrentUser({country: userInput.replace(" ", "_")})
    dropDownChangeHandler()
  }, [userInput, setCurrentUser]);



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
        {isCountryClicked
          ?
        <div >
          <Select
            ref={selectRef}
            value={countryOptions.find(country => (
              (country.value === userInput) || (country.value === currentUser.country)
            ))}
            options={countryOptions}
            onChange={(e) => dropdownSelectHelper(e)}
            placeholder="Country"
            styles={customStyles}
            menuIsOpen={isCountryClicked}
            openMenuOnFocus
          />
        </div>
          :
          <input type="button" value={emojiButton} id="emojidropdown" onClick={emojiClickHandler}></input>
        }
    </div>
  );
}

export default DropdownContainer;
