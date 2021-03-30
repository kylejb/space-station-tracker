import { useEffect, useState } from 'react';
import Select from 'react-select';
import { countryOptions } from 'data/countryOptions';

const DropdownContainer = ({ currentUser, setCurrentUser }) => {
  const [userInput, setUserInput] = useState("");


  useEffect(() => {
    setCurrentUser({country: userInput.replace(" ", "_")})
  }, [userInput, setCurrentUser]);


  return (
    <div className="dropdown-container">
      <Select
        value={countryOptions.find(country => (
          (country.value === userInput) || (country.value === currentUser.country)
        ))}
        options={countryOptions}
        onChange={(e) => setUserInput(e.value)}
        placeholder="Select your country..."
      />
    </div>
  );
}

export default DropdownContainer;
