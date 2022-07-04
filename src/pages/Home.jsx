import React, { useEffect, useRef } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Sort, { sortByList } from "../components/Sort";
import qs from "qs";
import { Pagination } from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  setSortOrder,
  setSortBy,
  setActiveCategory,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

const Home = () => {
  const itemsPerPage = 8;
  const categories = ["All", "Meat", "Veg", "Grill", "Spicy", "Stuffed"];

  const { sortOrder, activeCategory, sortBy, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const { items, status, pageCount } = useSelector((state) => state.pizzas);
  const dispatch = useDispatch();

  const firstRender = useRef(true);
  const isSearch = useRef(false);

  const [searchParams, setSearchParams] = useSearchParams({});

  const pizzaBlocks = items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);
  const skeletonBlocks = [...Array(8)].map((_, index) => <Skeleton key={index} />);

  const title = categories[activeCategory]
    ? `${categories[activeCategory]} Pizzas`
    : `Wow, undefined pizzas!`;

  const getItems = useCallback(async () => {
    const sortType = `&sortBy=${sortBy.sortType}`;
    const category = activeCategory > 0 ? `category=${activeCategory}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const order = `&order=${sortOrder}`;

    dispatch(fetchPizzas({ currentPage, itemsPerPage, category, sortType, order, search }));
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
      getItems();
    }
    isSearch.current = false;
  }, [getItems]);

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
      <h2 className="content__title">{searchValue ? `Results for: «${searchValue}»` : title}</h2>
      {status === "error" || (status === "loaded" && pizzaBlocks.length === 0) ? (
        <div className="content__error-info">
          <h2>Ops, something went wrong😕</h2>
          <p>
            {searchValue
              ? "No pizzas were found with such title."
              : "Couldn't get any pizzas. Try again later."}
          </p>
        </div>
      ) : (
        <div className="content__items">{status === "loading" ? skeletonBlocks : pizzaBlocks}</div>
      )}
      {pageCount > 1 && pizzaBlocks.length !== 0 ? (
        <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={pageCount} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
