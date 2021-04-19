import SearchResultsContainer from './SearchResults';
import DropdownContainer from './Dropdown';
import Search from 'components/search';

const SearchContainer = ({ fetchGeoDataFromZip, searchResult, currentUser, setCurrentUser }) => {
  return (
      <div className="search-container">
          <Search fetchGeoDataFromZip={fetchGeoDataFromZip}>
            <DropdownContainer currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Search>
          {searchResult[0]
            ? <SearchResultsContainer currentUser={currentUser} searchResult={searchResult} />
            : null
          }
      </div>
  );
}

export default SearchContainer;
