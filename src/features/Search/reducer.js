const searchReducer = (currentState = [], action) => {
    switch (action.type) {
        case 'GET_ISS_LOCATION':
            const { ...metaData } = action.payload;
            //! Scaffolding reducers
            console.log("GET_ISS_LOC", metaData);
            break;
        default:
            return currentState;
    };
};

export default searchReducer;
