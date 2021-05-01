import { createSlice } from '@reduxjs/toolkit';

const earthSlice = createSlice({
    name: "earth",
    initialState: {
        isValid: false,
        isDropArmed: false,
        wwd: null,
        nextLayerId: 1,
        categoryTimestamps: new Map(),
        roundGlobe: null,
        flatGlobe: null,
        dropCallback: null,
    },
    reducers: {
        getISS: (state, action) => {
            const { ...data } = action.payload;

            console.log("what is state", state);
            console.log("what is data", data);
            return
        }
    }
});

export default earthSlice.reducer;
