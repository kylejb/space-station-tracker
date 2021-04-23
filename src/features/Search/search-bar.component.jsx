import { useState, useEffect, useRef } from 'react';

const SearchBar = ({ fetchGeoDataFromZip, currentUser }) => {
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [userInput, setUserInput] = useState('');

    const submitRef = useRef(null);

    const handleChange = (event) => {
        setUserInput(event.target.value);
    };

    useEffect(() => {
        setUserInput('');
    }, [currentUser]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.charCode === 13) {
            submitRef.current.click();
        }
    };

    return (
        <div className='searchbar-input'>
            <input
                name='searchZipCode'
                type='search'
                placeholder='Enter ZIP Code'
                value={userInput}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                id='zipinput'
            />
            <input
                ref={submitRef}
                type='submit'
                value='Find Sightings'
                disabled={isUserSearching}
                aria-disabled={isUserSearching}
                onClick={() => {
                    setIsUserSearching(true);
                    fetchGeoDataFromZip(userInput, setIsUserSearching); // TODO: refactor w/o second parameter
                }}
                id='zipsearchsubmit'
            />
        </div>
    );
};

export default SearchBar;
