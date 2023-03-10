import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {
    path: "/",
    title: "Home",
  },
};

export const routerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setURL: (state, action) => {
      state.url = action.payload;

      // console.log(state, action.payload);
    },
  },
});

export const { setURL } = routerSlice.actions;

export default routerSlice;
