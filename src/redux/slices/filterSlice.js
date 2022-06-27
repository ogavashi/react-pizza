import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  sortBy: {
    name: "popularity",
    sortType: "rating",
  },
  sortOrder: "asc",
  currentPage: 1,
  pageCount: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveCategory(state, { payload }) {
      state.activeCategory = payload;
      state.currentPage = 1;
    },
    setSortBy(state, { payload }) {
      state.sortBy = payload;
    },
    setSortOrder(state, { payload }) {
      state.sortOrder = payload;
    },
    setCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    setPageCount(state, { payload }) {
      state.pageCount = payload;
    },
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
      state.currentPage = 1;
      state.activeCategory = 0;
    },
    setFilters(state, { payload }) {
      state.sortOrder = payload.sortOrder;
      state.sortBy = payload.sort;
      state.activeCategory = Number(payload.activeCategory);
      if (payload.currentPage > state.pageCount) state.currentPage = 1;
      else state.currentPage = Number(payload.currentPage);
    },
  },
});

export const {
  setActiveCategory,
  setSortBy,
  setSortOrder,
  setCurrentPage,
  setPageCount,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
