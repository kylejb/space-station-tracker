import SearchResultsContainer from './SearchResultsContainer';
import Search from 'components/search';

const SearchContainer = ({ fetchGeoDataFromZip, searchResult }) => {
    return (
        <div className="search-container">
            <Search fetchGeoDataFromZip={fetchGeoDataFromZip} />
            <SearchResultsContainer searchResult={searchResult} />
        </div>
    );
}

export default SearchContainer;
