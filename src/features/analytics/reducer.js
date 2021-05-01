const userReducer = (currentState = [], action) => {
    switch (action.type) {
        case 'GET_USER_LOCATION':
            const { ...metaData } = action.payload;
            //! Scaffolding reducers
            console.log("GET_USER_LOC", metaData);
            break;
        default:
            return currentState;
    };
};

export default userReducer;
