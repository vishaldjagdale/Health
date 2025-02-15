// Import the createSlice function from Redux Toolkit to create a slice of the Redux store
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the auth slice
const initialState = {
    user: null, // Holds the current user's information; null when not logged in
    isAuthenticated: false, // Boolean indicating whether the user is authenticated
};

// Create the auth slice
const authSlice = createSlice({
    name: "authSlice", // Name of the slice, used to identify this slice in the Redux store
    initialState, // Initial state for this slice
    reducers: {
        // Reducer for logging in the user
        userLoggedIn: (state, action) => {
            state.user = action.payload.user; // Set the user data from the payload
            state.isAuthenticated = true; // Update the authentication status to true
        },
        // Reducer for logging out the user
        userLoggedOut: (state) => {
            state.user = null; // Clear the user data
            state.isAuthenticated = false; // Update the authentication status to false
        },
    },
});

// Export the actions so they can be used to dispatch state changes
export const { userLoggedIn, userLoggedOut } = authSlice.actions;

// Export the reducer to be used in the Redux store
export default authSlice.reducer;