import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "common/reducers";

const middleware = [ thunk ];

// Setup for development only middleware
// if (process.env.NODE_ENV !== 'production') {
//     middleware.push();
// }

const composeEnhancers = composeWithDevTools({
    // actionsBlacklist, actionsCreators, and other other options if needed
});

const Store = createStore(rootReducer, {}, composeEnhancers(
    applyMiddleware(...middleware),
));

//? Consider trigger dispatch to populate initial state upon store creation
// Store.dispatch(getUserAndSatelliteInfo)

export default Store;
