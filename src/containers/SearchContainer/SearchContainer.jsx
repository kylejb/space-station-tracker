import SearchResultsContainer from './SearchResultsContainer';
import SearchBar from 'components/search';

const SearchContainer = ({ fetchGeoDataFromZip, searchResult, currentUser }) => {
    return (
        <div className="search-container">
            <SearchBar fetchGeoDataFromZip={fetchGeoDataFromZip} />
            <SearchResultsContainer currentUser={currentUser} searchResult={searchResult} />
        </div>
    );
}

export default SearchContainer;
