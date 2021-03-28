import SearchResultsContainer from './SearchResultsContainer';
import SearchBar from 'components/search';

const SearchContainer = ({ fetchGeoDataFromZip, searchResult }) => {
    return (
        <div className="search-container">
            <SearchBar fetchGeoDataFromZip={fetchGeoDataFromZip} />
            <SearchResultsContainer searchResult={searchResult} />
        </div>
    );
}

export default SearchContainer;
