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
      width: 65,
      height: 25,
      // minHeight: 25
    }),
  }

  return (
    <div className="dropdown-container">
      <Select
        value={countryOptions.find(country => (
          (country.value === userInput) || (country.value === currentUser.country)
        ))}
        options={countryOptions}
        onChange={(e) => setUserInput(e.value)}
        placeholder="Country"
        styles={customStyles}
      />
    </div>
  );
}

export default DropdownContainer;
