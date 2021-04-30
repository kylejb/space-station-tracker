import { GET_ISS_LOCATION } from 'common/constants/ActionTypes';

const searchReducer = (currentState = {search: []}, action) => {
    switch (action.type) {
        case GET_ISS_LOCATION:
            const { ...metaData } = action.payload;
            //! Scaffolding reducers
            console.log("GET_ISS_LOC", metaData);
            break;
        default:
            return currentState;
    };
};

export default searchReducer;
