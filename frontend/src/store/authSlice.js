import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    logoutUser: (state) => {
        state.user = null;
      },
  },
});

export const { setUser, setLoading,logoutUser  } = authSlice.actions;
export default authSlice.reducer;
