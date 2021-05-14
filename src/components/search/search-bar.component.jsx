import { useState, useEffect } from 'react';
import { ZIPLENGTH_ERROR_MESSAGE } from 'utils/constants';
import { useErrorContext, useSearchContext } from 'common/hooks';

const SearchBar = ({ fetchGeoDataFromZip, currentUser }) => {
  const [userInput, setUserInput] = useState("");

  const { addError, removeError } = useErrorContext();
//   const { removeSearchResult } = useSearchContext();

  const searchValueHandler = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    setUserInput("");
  }, [currentUser]);


  return (
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
            // removeSearchResult();
            if (userInput.length <= 2) {
                addError(
                    ZIPLENGTH_ERROR_MESSAGE.message,
                    ZIPLENGTH_ERROR_MESSAGE.type,
                );
            } else {
                fetchGeoDataFromZip(userInput);
                removeError();
            }
          }}
          id="zipsearchsubmit"
          />
      </div>
    );
};

export default SearchBar;
