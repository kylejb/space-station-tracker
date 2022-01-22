import { useEffect, useRef, useState } from 'react';

const SearchBar = ({ fetchGeoDataFromZip, currentUser }) => {
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [userInput, setUserInput] = useState('');
    const submitRef = useRef(null) as any; // TODO: Remove type casting

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
        <>
            <input
                className='h-full p-4 font-basier text-gray-300 bg-stone-800 bg-opacity-50 border-neutral-400 outline-none border-2 placeholder:text-gray-400 focus:shadow-input'
                name='searchZipCode'
                type='search'
                placeholder='Enter ZIP Code'
                value={userInput}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
            />
            <input
                ref={submitRef}
                type='submit'
                className='h-full w-20 font-basier text-sm bg-neutral-400 border-none rounded-r-md cursor-pointer hover:bg-stone-600 disabled:bg-stone-600 disabled:pointer-events-none'
                value='Search'
                disabled={isUserSearching}
                aria-disabled={isUserSearching}
                onClick={() => {
                    setIsUserSearching(true);
                    fetchGeoDataFromZip(userInput, setIsUserSearching); // TODO: refactor w/o second parameter
                }}
            />
        </>
    );
};

export default SearchBar;
