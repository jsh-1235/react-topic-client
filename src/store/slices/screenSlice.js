import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: {
    isMobile: true,
    extended: false,
  },
};

export const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setScreen: (state, action) => {
      state.screen = action.payload;

      console.log("=======================");
      console.log(action.payload);
    },
    setExtend: (state, action) => {
      state.screen = action.payload;
    },
  },
});

export const { setScreen, setExtend } = screenSlice.actions;

export default screenSlice;
