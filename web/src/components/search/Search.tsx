import SearchBar from './search-bar.component';

const Search = ({ children, currentUser, fetchGeoDataFromZip }) => (
    <div className='flex h-full'>
        {children}
        <SearchBar fetchGeoDataFromZip={fetchGeoDataFromZip} currentUser={currentUser} />
    </div>
);

export default Search;
