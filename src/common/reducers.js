import { combineReducers } from 'redux';
import { reducer as searchReducer } from 'features/search';
import { reducer as userReducer } from 'features/analytics';
import { earthReducer } from 'features/earth';


export default combineReducers({
    user: userReducer,
    search: searchReducer,
    earth: earthReducer,
});
