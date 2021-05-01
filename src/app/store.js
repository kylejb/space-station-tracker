import { configureStore } from '@reduxjs/toolkit';
import { earthReducer, searchReducer, userReducer } from 'common/reducers';


const Store = configureStore({
    reducer: {
        earth: earthReducer,
        search: searchReducer,
        user: userReducer,
    },
});

//? Consider trigger dispatch to populate initial state upon store creation
// Store.dispatch(getUserAndSatelliteInfo)

export default Store;
