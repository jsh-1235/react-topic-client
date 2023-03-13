import { createSlice } from "@reduxjs/toolkit";

export const Type = {
  DEFAULT: "default",
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  REMOVE: "remove",
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
    ready: (state, action) => {
      if (JSON.parse(localStorage.getItem("topics")) === null) {
        localStorage.setItem("topics", JSON.stringify([]));
      } else {
        state.topics = {
          ...state.topics,
          contents: JSON.parse(localStorage.getItem("topics")),
        };
      }
    },
    create: (state, action) => {
      console.log(action.type, action.payload);

      const contents = [...state.topics.contents, action.payload.content];

      state.topics.mode = Type.CREATE;
      state.topics.current = action.payload.content.id;
      state.topics.content = action.payload.content;
      state.topics.contents = contents;

      localStorage.setItem("topics", JSON.stringify(contents));
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

      const contents = state.topics.contents.map((content) => {
        if (content.id === action.payload.content.id) {
          return action.payload.content;
        } else {
          return content;
        }
      });

      console.log(contents);

      state.topics = {
        mode: Type.UPDATE,
        current: action.payload.id,
        content: action.payload.content,
        contents: contents,
      };

      localStorage.setItem("topics", JSON.stringify(contents));
    },
    remove: (state, action) => {
      console.log(action.type, action.payload);

      const contents = state.topics.contents.filter((content) => content.id !== action.payload);

      state.topics = {
        ...state.topics,
        mode: Type.REMOVE,
        current: initialState.topics.current,
        content: initialState.topics.content,
        contents: contents,
      };

      localStorage.setItem("topics", JSON.stringify(contents));
    },
  },
});

export const { ready, create, read, update, remove } = topicSlice.actions;

export default topicSlice;
