import { createSlice } from "@reduxjs/toolkit";

export const Type = {
  DEFAULT: "default",
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
};

const initialState = {
  topics: {
    mode: Type.DEFAULT,
    current: -1,
    content: {
      id: -1,
      title: "Topics",
      description: "Please leave a comment on a topic related to the program.",
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
          mode: Type.DEFAULT,
          current: -1,
          contents: JSON.parse(localStorage.getItem("topics")),
        };
      }
    },
    create: (state, action) => {
      const contents = [...state.topics.contents, action.payload.content];

      state.topics = {
        mode: Type.CREATE,
        content: action.payload.content,
        contents: contents,
      };

      localStorage.setItem("topics", JSON.stringify(contents));
    },
    read: (state, action) => {
      console.log(action.type, action.payload);

      state.topics.current = action.payload.id;
      state.topics.content = action.payload.content;
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
        mode: Type.DELETE,
        current: -1,
        contents: contents,
      };

      localStorage.setItem("topics", JSON.stringify(contents));
    },
  },
});

export const { ready, create, read, update, remove } = topicSlice.actions;

export default topicSlice;
