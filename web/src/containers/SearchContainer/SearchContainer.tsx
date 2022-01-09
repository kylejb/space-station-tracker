import SearchResultsContainer from './SearchResults';
import DropdownContainer from './Dropdown';
import Search from 'components/search';

const SearchContainer = ({ fetchGeoDataFromZip, currentUser, setCurrentUser }) => (
    <div className='fixed right-12 top-14 z-10 h-12'>
        <Search fetchGeoDataFromZip={fetchGeoDataFromZip} currentUser={currentUser}>
            <DropdownContainer currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Search>
        <SearchResultsContainer currentUser={currentUser} />
    </div>
);

export default SearchContainer;
