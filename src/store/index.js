import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import counterSlice from "./slices/counterSlice";
import routerSlice from "./slices/routerSlice";
import screenSlice from "./slices/screenSlice";
import topicSlice from "./slices/topicSlice";

const logger = createLogger();

const initialState = {};

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    router: routerSlice.reducer,
    screen: screenSlice.reducer,
    topics: topicSlice.reducer,
    middleware: [logger],
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
});

export default store;
