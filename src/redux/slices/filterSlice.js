import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  sortBy: {
    name: "popularity",
    sortType: "rating",
  },
  isAsc: true,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveCategory(state, { payload }) {
      state.activeCategory = payload;
    },
    setSortBy(state, { payload }) {
      state.sortBy = payload;
    },
    setIsAsc(state, { payload }) {
      state.isAsc = payload;
    },
  },
});

export const { setActiveCategory, setSortBy, setIsAsc } = filterSlice.actions;

export default filterSlice.reducer;
