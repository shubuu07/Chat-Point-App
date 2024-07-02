import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    details: {},
    chatDetails: {}
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.details = action.payload
        },
        setChatDetails: (state, action) => {
            state.chatDetails = action.payload
        },
    },
});

export const {
    setUserDetails,
    setChatDetails,
} = userSlice.actions;

export default userSlice.reducer;
