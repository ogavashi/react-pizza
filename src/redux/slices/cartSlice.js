import { createSlice } from "@reduxjs/toolkit";
import { calcTotalCount } from "../../utils/calcTotalCount";
import { calcTotalSum } from "../../utils/calcTotalSum";

const initialState = {
  items: [],
  totalSum: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const existing = state.items.find((item) => item.id === payload.id);
      if (!existing) {
        state.items.push({ ...payload, count: 1 });
      } else {
        existing.count++;
      }
      state.totalCount = calcTotalCount(state.items);
      state.totalSum = calcTotalSum(state.items);
    },
    removeItem(state, { payload }) {
      state.items = state.items.filter((item) => item.id !== payload);
      state.totalCount = calcTotalCount(state.items);
      state.totalSum = calcTotalSum(state.items);
    },
    minusItem(state, { payload }) {
      const existing = state.items.find((item) => item.id === payload.id);
      if (existing.count > 1) existing.count--;
      else state.items = state.items.filter((item) => item.id !== payload.id);
      state.totalCount = calcTotalCount(state.items);
      state.totalSum = calcTotalSum(state.items);
    },
    eraseItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalSum = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, eraseItems } = cartSlice.actions;

export default cartSlice.reducer;
