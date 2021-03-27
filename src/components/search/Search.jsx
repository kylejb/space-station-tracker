import SearchBar from './search-bar.component';

const Search = ({ fetchGeoDataFromZip }) => {
  return (
    <div className="search">
      <SearchBar fetchGeoDataFromZip={fetchGeoDataFromZip} />
    </div>
  );
};

export default Search;
