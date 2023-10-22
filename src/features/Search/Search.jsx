import SearchBar from './search-bar.component';
import "./style.scss";

const Search = ({ children, currentUser, fetchGeoDataFromZip }) => {
    return (
        <div className="search">
            {children}
            <SearchBar fetchGeoDataFromZip={fetchGeoDataFromZip} currentUser={currentUser} />
        </div>
    );
}

export default Search;
