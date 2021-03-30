import { useState } from 'react';

const SearchBar = ({ fetchGeoDataFromZip }) => {
  const [userInput, setUserInput] = useState("");

  const searchValueHandler = (event) => {
    setUserInput(event.target.value);
  };


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
        value="Search"
        onClick={(e) => fetchGeoDataFromZip(userInput)}
        />
    </div>
  );
};

export default SearchBar;