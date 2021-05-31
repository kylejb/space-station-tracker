import SearchResultsContainer from './SearchResults';
import DropdownContainer from './Dropdown';
import Search from 'components/search';
import './style.scss';

const SearchContainer = ({ fetchGeoDataFromZip, currentUser, setCurrentUser }) => (
    <div className="search-container">
        <Search fetchGeoDataFromZip={fetchGeoDataFromZip} currentUser={currentUser}>
            <DropdownContainer currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Search>
        <SearchResultsContainer currentUser={currentUser} />
    </div>
);

export default SearchContainer;
