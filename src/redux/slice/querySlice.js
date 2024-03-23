import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const queryActions = querySlice.actions;

export default querySlice.reducer;
