import { combineReducers } from 'redux';
import { reducer as search } from 'features/search';
import { reducer as user } from 'features/analytics';

export default combineReducers({
    user,
    search
});
