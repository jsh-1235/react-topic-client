import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const fetchAsync = createAsyncThunk("counter/fetchAsync", async (message) => {
  console.log(message);

  const response = await fetch("https://api.countapi.xyz/hit/opesaljkdfslkjfsadf.com/visits");

  const data = await response.json();

  return data.value;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;

      console.log(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsync.pending, (state, action) => {
      state.status = "pending";
    });

    builder.addCase(fetchAsync.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.count = action.payload;
    });

    builder.addCase(fetchAsync.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const { setCount } = counterSlice.actions;

export default counterSlice;
