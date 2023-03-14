import { createSlice } from "@reduxjs/toolkit";

export const Type = {
  DEFAULT: "default",
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  REMOVE: "remove",
  CLEAR: "clear",
};

const initialState = {
  topics: {
    mode: Type.DEFAULT,
    current: undefined,
    content: {
      id: undefined,
      title: "Topics",
      description: "Please leave a comment on a topic related to the program.",
      date: new Date().toLocaleString(),
    },
    contents: [],
  },
};

export const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    load: (state, action) => {
      if (JSON.parse(window.localStorage.getItem("topics")) === null) {
        window.localStorage.setItem("topics", JSON.stringify([]));
      } else {
        state.topics = {
          ...state.topics,
          contents: JSON.parse(window.localStorage.getItem("topics")),
        };
      }
    },
    create: (state, action) => {
      console.log(action.type, action.payload);

      state.topics = {
        mode: Type.CREATE,
        current: action.payload.content.id,
        content: action.payload.content,
        contents: [...state.topics.contents, action.payload.content],
      };

      window.localStorage.setItem("topics", JSON.stringify(state.topics.contents));
    },
    read: (state, action) => {
      console.log(action.type, action.payload);

      state.topics.mode = action.payload.mode;

      if (action.payload.id) {
        state.topics.current = action.payload.id;
        state.topics.content = action.payload.content;
      } else {
        state.topics.current = initialState.topics.current;
        state.topics.content = initialState.topics.content;
      }
    },
    update: (state, action) => {
      console.log(action.type, action.payload);

      state.topics = {
        mode: Type.UPDATE,
        current: action.payload.id,
        content: action.payload.content,
        contents: state.topics.contents.map((content) => {
          if (content.id === action.payload.content.id) {
            return action.payload.content;
          } else {
            return content;
          }
        }),
      };

      window.localStorage.setItem("topics", JSON.stringify(state.topics.contents));
    },
    remove: (state, action) => {
      console.log(action.type, action.payload);

      state.topics = {
        mode: Type.REMOVE,
        current: initialState.topics.current,
        content: initialState.topics.content,
        contents: state.topics.contents.filter((content) => content.id !== action.payload),
      };

      window.localStorage.setItem("topics", JSON.stringify(state.topics.contents));
    },
    clear: (state, action) => {
      console.log(action.type, action.payload);

      state.topics = {
        mode: Type.CLEAR,
        current: initialState.topics.current,
        content: initialState.topics.content,
        contents: [],
      };

      window.localStorage.removeItem("topics");
    },
  },
});

export const { load, create, read, update, remove, clear } = topicSlice.actions;

export default topicSlice;
