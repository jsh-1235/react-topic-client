import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: {
    isMobile: false,
  },
};

export const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setScreen: (state, action) => {
      state.screen = action.payload;
    },
  },
});

export const { setScreen } = screenSlice.actions;

export default screenSlice;
