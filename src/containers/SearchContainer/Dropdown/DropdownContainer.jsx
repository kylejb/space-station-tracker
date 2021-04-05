import { useEffect, useState } from 'react';
import Select from 'react-select';
import { countryOptions } from 'data/countryOptions';
import "./style.scss"

const DropdownContainer = ({ currentUser, setCurrentUser }) => {
  const [userInput, setUserInput] = useState("");


  useEffect(() => {
    setCurrentUser({country: userInput.replace(" ", "_")})
  }, [userInput, setCurrentUser]);

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: '300px' ,
    })
    
  }

  return (
    <div className="dropdown-container">
      <Select
        value={countryOptions.find(country => (
          (country.value === userInput) || (country.value === currentUser.country)
        ))}
        options={countryOptions}
        onChange={(e) => setUserInput(e.value)}
        placeholder="Select your country..."
        styles={customStyles}
      />
    </div>
  );
}

export default DropdownContainer;
