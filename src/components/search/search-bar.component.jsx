import { useState, useEffect } from 'react';


const SearchBar = ({ fetchGeoDataFromZip, currentUser }) => {
  const [userInput, setUserInput] = useState("");

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
        placeholder="Enter postcode"
        value={userInput}
        onChange={searchValueHandler}
        id="zipinput"
        />
      <input
        type="submit"
        value="Find Sightings"
        onClick={(e) => {
          if (userInput.length <= 2) {
            // errorMessageRender if true here
          } else {
            fetchGeoDataFromZip(userInput)
          }
        }}
        id="zipsearchsubmit"
        />
    </div>
  );
};

export default SearchBar;
