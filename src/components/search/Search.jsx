import SearchBar from './search-bar.component';

const Search = ({ fetchGeoDataFromZip }) => {
  return (
    <div className="search">
      <h1>Search Component</h1>
      <SearchBar fetchGeoDataFromZip={fetchGeoDataFromZip} />
    </div>
  );
};

export default Search;
