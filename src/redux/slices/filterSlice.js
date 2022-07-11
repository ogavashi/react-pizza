import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  sortBy: {
    name: "popularity",
    sortType: "rating",
  },
  sortOrder: "asc",
  currentPage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveCategory(state, { payload }) {
      state.activeCategory = payload;
      state.currentPage = 1;
      state.searchValue = "";
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
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
      state.currentPage = 1;
      state.activeCategory = 0;
    },
    setFilters(state, { payload }) {
      state.sortOrder = payload.sortOrder;
      state.sortBy = payload.sort;
      state.activeCategory = Number(payload.activeCategory);
      state.currentPage = Number(payload.currentPage);
    },
  },
});

export const selectFilter = (state) => state.filter;

export const {
  setActiveCategory,
  setSortBy,
  setSortOrder,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
