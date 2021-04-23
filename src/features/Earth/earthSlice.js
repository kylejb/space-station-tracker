import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isValid: false,
    isDropArmed: false,
    nextLayerId: 1,
    roundGlobe: null,
    flatGlobe: null,
    dropCallback: null,
    satelliteCollection: [],
    status: 'idle',
    error: null,
};

export const fetchISS = createAsyncThunk('earth/fetchISS', async () => {
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    let data = await response.json();
    return data;
});

const earthSlice = createSlice({
    name: "earth",
    initialState,
    reducers: {
        updateISS: (state, action) => {
            // TODO - add later
            // ISS Satellite ID is 25544 at this endpoint
            // const findISS = async () => {
            //     const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
            //     let data = await response.json();
            //     setStationObj([ data ]);
            // }
        },
    },
    extraReducers: {
        [fetchISS.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchISS.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            //! MVP: ISS satellite only within an array for ease of refactoring when adding more
            state.satelliteCollection = [action.payload];
        },
        [fetchISS.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const {
    getISS,
    updateISS,
} = earthSlice.actions;

export const getSatellite = (state) => ({
    satelliteCollection: state.earth.satelliteCollection,
    status: state.earth.status,
});

export default earthSlice.reducer;
