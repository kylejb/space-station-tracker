import Search from 'components/search';

import DropdownContainer from './Dropdown';
import SearchResultsContainer from './SearchResults';

function SearchContainer({ fetchGeoDataFromZip, currentUser, setCurrentUser }): JSX.Element {
    return (
        <div className='fixed right-8 top-12 z-10 h-12 w-[400px]'>
            <Search fetchGeoDataFromZip={fetchGeoDataFromZip} currentUser={currentUser}>
                <DropdownContainer currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </Search>
            <SearchResultsContainer currentUser={currentUser} />
        </div>
    );
}

export default SearchContainer;
