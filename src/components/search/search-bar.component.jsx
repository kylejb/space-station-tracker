import { useState, useEffect } from 'react';
import { INITIAL_LOAD, ZIPLENGTH_ERROR_MESSAGE } from 'utils/constants';
import Error from 'components/error'

const SearchBar = ({ fetchGeoDataFromZip, currentUser }) => {
  const [userInput, setUserInput] = useState("");
  const [inputError, setInputError] = useState(INITIAL_LOAD)

  const searchValueHandler = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    setUserInput("");
  }, [currentUser]);


  return (
    <>
      <div className='searchbar-input'>
        <input
          name="searchZipCode"
          type="search"
          placeholder="Enter ZIP Code"
          value={userInput}
          onChange={searchValueHandler}
          id="zipinput"
          />
        <input
          type="submit"
          value="Find Sightings"
          onClick={(e) => {
            if (userInput.length <= 2) {
              setInputError(ZIPLENGTH_ERROR_MESSAGE.message)
            } else {
              fetchGeoDataFromZip(userInput)
              setInputError("OK")
            }
          }}
          id="zipsearchsubmit"
          />
      </div>
      {inputError === ZIPLENGTH_ERROR_MESSAGE.message && <Error errormessage={ZIPLENGTH_ERROR_MESSAGE}/>}
    </>
  );
};

export default SearchBar;
