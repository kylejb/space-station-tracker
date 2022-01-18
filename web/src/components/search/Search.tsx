import SearchBar from './search-bar.component';

interface SearchProps {
    children: any;
    currentUser: any;
    fetchGeoDataFromZip: any;
}

function Search({ children, currentUser, fetchGeoDataFromZip }: SearchProps): JSX.Element {
    return (
        <div className='flex h-full w-full'>
            {children}
            <SearchBar fetchGeoDataFromZip={fetchGeoDataFromZip} currentUser={currentUser} />
        </div>
    );
}

export default Search;
