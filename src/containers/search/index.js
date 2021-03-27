import SearchResultsContainer from './search-results.container';
import Search from 'components/search';

const SearchContainer = () => {
    return (
        <div className="search-container">
            <Search />
            <SearchResultsContainer />
        </div>
    );
}

export default SearchContainer;
