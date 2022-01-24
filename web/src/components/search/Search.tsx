import { FC } from 'react';
import SearchBar from './search-bar.component';

type SearchProps = {
    children: any;
    currentUser: any;
    fetchGeoDataFromZip: any;
};

const Search: FC<SearchProps> = ({ children, currentUser, fetchGeoDataFromZip }) => (
    <div className='flex h-full w-full'>
        {children}
        <SearchBar fetchGeoDataFromZip={fetchGeoDataFromZip} currentUser={currentUser} />
    </div>
);

export default Search;
