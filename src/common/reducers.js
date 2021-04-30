import { combineReducers } from 'redux';
import { reducer as search } from 'features/search';
import { reducer as user } from 'features/analytics';
import { reducer as earth } from 'features/earth';

export default combineReducers({
    user,
    search,
    earth,
});
