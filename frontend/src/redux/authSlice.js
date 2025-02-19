import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        }
    }
});
export const {setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;