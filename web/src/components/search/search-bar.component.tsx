import { TAB_INDEX } from 'common/constants';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

function SearchBar({ fetchGeoDataFromZip, currentUser }): JSX.Element {
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [userInput, setUserInput] = useState('');
    const submitRef = useRef(null) as any; // TODO: Remove type casting

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setUserInput(event.target.value);
    };

    useEffect(() => {
        setUserInput('');
    }, [currentUser]);

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.code === 'Enter') {
            submitRef.current.click();
        }
    };

    return (
        <>
            <input
                className='h-full w-full p-4 font-basier text-gray-300 bg-stone-800 bg-opacity-50 border-neutral-400 outline-none border placeholder:text-center placeholder:text-gray-400 placeholder:text-sm focus:shadow-input tracking-widest'
                name='searchZipCode'
                type='search'
                placeholder='Enter ZIP Code'
                value={userInput}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                tabIndex={TAB_INDEX.searchInput}
            />
            <input
                ref={submitRef}
                type='submit'
                className='h-full w-full font-basier text-sm bg-neutral-400 border-none rounded-r-md cursor-pointer hover:bg-stone-600 disabled:bg-stone-600 disabled:pointer-events-none tracking-wider'
                value='Find Sightings'
                disabled={isUserSearching}
                aria-disabled={isUserSearching}
                tabIndex={TAB_INDEX.searchSubmit}
                onClick={() => {
                    setIsUserSearching(true);
                    fetchGeoDataFromZip(userInput, setIsUserSearching); // TODO: refactor w/o second parameter
                }}
            />
        </>
    );
}

export default SearchBar;
