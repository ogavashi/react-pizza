import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzasStatus", async (params) => {
  const { currentPage, itemsPerPage, category, sortType, order, search } = params;
  const { data } = await axios.get(
    `https://62b18186c7e53744afbaa222.mockapi.io/pizzas?page=${currentPage}&limit=${itemsPerPage}&${category}${sortType}${order}${search}`
  );
  return { ...data, itemsPerPage };
});

const initialState = {
  items: [],
  status: "loading",
  pageCount: 0,
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, { payload }) {
      state.items = payload.items;
    },
    setPageCount(state, { payload }) {
      state.pageCount = payload.count;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, { payload }) => {
      state.status = "loaded";
      state.items = payload.items;
      state.pageCount = Math.ceil(payload.count / payload.itemsPerPage);
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzas = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
