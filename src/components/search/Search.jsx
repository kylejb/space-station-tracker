import SearchBar from './search-bar.component';

const Search = ({ children, fetchGeoDataFromZip }) => {
  return (
    <div className="search">
      <h1>Search Component</h1>
      {children}
      <SearchBar fetchGeoDataFromZip={fetchGeoDataFromZip} />
    </div>
  );
}

export default Search;
