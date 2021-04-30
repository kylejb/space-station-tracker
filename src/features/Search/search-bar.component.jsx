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
        />
      <input
        type="submit"
        value="🛰️ Sightings"
        onClick={(e) => fetchGeoDataFromZip(userInput)}
        />
    </div>
  );
};

export default SearchBar;
