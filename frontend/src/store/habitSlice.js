import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  const res = await axios.get("/api/habits");
  return res.data;
});

export const habitSlice = createSlice({
  name: "habits",
  initialState: { habits: [], loading: false },
  reducers: {
    addHabit: (state, action) => {
      state.habits.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHabits.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchHabits.fulfilled, (state, action) => {
      state.loading = false;
      state.habits = action.payload;
    });
  }
});

export const { addHabit } = habitSlice.actions;
export default habitSlice.reducer;
