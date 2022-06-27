import React, { useEffect, useState, useRef } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Sort, { sortByList } from "../components/Sort";
import axios from "axios";
import qs from "qs";
import { Pagination } from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  setSortOrder,
  setSortBy,
  setActiveCategory,
  setCurrentPage,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const itemsPerPage = 8;

  const { sortOrder, activeCategory, sortBy, currentPage, pageCount, searchValue } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const firstRender = useRef(true);
  const isSearch = useRef(false);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams({});

  const pizzaBlocks = pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);
  const skeletonBlocks = [...Array(8)].map((_, index) => <Skeleton key={index} />);

  const fetchItems = useCallback(async () => {
    const sortType = `&sortBy=${sortBy.sortType}`;
    const category = activeCategory > 0 ? `category=${activeCategory}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const order = `&order=${sortOrder}`;
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://62b18186c7e53744afbaa222.mockapi.io/pizzas?page=${currentPage}&limit=${itemsPerPage}&${category}${sortType}${order}${search}`
      );
      setPizzas(response.data.items);
      dispatch(setPageCount(Math.ceil(response.data.count / itemsPerPage)));
      setIsLoading(false);
    } catch (error) {
      alert("Couldn't get pizzas :(");
    }
  }, [searchValue, sortOrder, sortBy, activeCategory, currentPage, dispatch]);

  useEffect(() => {
    if (!firstRender.current)
      setSearchParams({
        activeCategory,
        sortBy: sortBy.sortType,
        sortOrder,
        currentPage,
      });
    firstRender.current = false;
  }, [activeCategory, sortBy, sortOrder, currentPage, setSearchParams]);

  useEffect(() => {
    if (!!searchParams.toString()) {
      const params = qs.parse(searchParams.toString());

      const sort = sortByList.find((sortBy) => sortBy.sortType === params.sortBy);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isSearch.current) {
      fetchItems();
    }
    isSearch.current = false;
  }, [fetchItems]);

  const onChangePage = (page) => {
    window.scrollTo(0, 0);
    dispatch(setCurrentPage(page));
  };

  const onChangeCategory = (index) => {
    dispatch(setActiveCategory(index));
  };

  const onChangeSortBy = (obj) => {
    dispatch(setSortBy(obj));
  };

  const onChangeSortOrder = () => {
    if (sortOrder === "asc") dispatch(setSortOrder("desc"));
    if (sortOrder === "desc") dispatch(setSortOrder("asc"));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={activeCategory} setActiveCategory={onChangeCategory} />
        <Sort
          isSelected={sortBy}
          setIsSelected={onChangeSortBy}
          sortOrder={sortOrder}
          setSortOrder={onChangeSortOrder}
        />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">{isLoading ? skeletonBlocks : pizzaBlocks}</div>
      {pageCount ? (
        <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={pageCount} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
