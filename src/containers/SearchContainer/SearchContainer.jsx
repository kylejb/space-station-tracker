import SearchResultsContainer from './SearchResults';
import DropdownContainer from './Dropdown';
import Search from 'components/search';
import "./style.scss"

const SearchContainer = ({ fetchGeoDataFromZip, searchResult, currentUser, setCurrentUser }) => {
  return (
      <div className="search-container">
          <Search fetchGeoDataFromZip={fetchGeoDataFromZip}>
            <DropdownContainer currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Search>
          <SearchResultsContainer currentUser={currentUser} searchResult={searchResult} />
      </div>
  );
}

export default SearchContainer;
