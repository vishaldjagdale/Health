import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Load user from localStorage if available
const storedUser = JSON.parse(localStorage.getItem("user"));

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Ensures cookies are included (if used)
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // ✅ Store user info in localStorage after successful login
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: storedUser || null, // ✅ Restore user from localStorage if exists
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Update localStorage
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // ✅ Clear localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, setLoading, logoutUser } = authSlice.actions;
export default authSlice.reducer;
