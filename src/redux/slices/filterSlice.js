import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  sortBy: {
    name: "popularity",
    sortType: "rating",
  },
  isAsc: true,
  currentPage: 1,
  pageCount: 1,
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
    setCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    setPageCount(state, { payload }) {
      state.pageCount = payload;
    },
  },
});

export const { setActiveCategory, setSortBy, setIsAsc, setCurrentPage, setPageCount } =
  filterSlice.actions;

export default filterSlice.reducer;
