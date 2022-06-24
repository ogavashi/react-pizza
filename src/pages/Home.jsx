import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import axios from "axios";
import { useContext } from "react";
import { SearchContext } from "../App";
import { Pagination } from "../components/Pagination";

const Home = () => {
  const itemsPerPage = 8;

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState({ name: "popularity", sortType: "rating" });
  const [activeCategory, setActiveCategory] = useState(0);
  const [isAsc, setIsAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const { searchValue } = useContext(SearchContext);

  const pizzaBlocks = pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);
  const skeletonBlocks = [...Array(8)].map((_, index) => <Skeleton key={index} />);

  const onChangePage = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  useEffect(() => {
    const sortOrder = isAsc ? "asc" : "desc";

    (async () => {
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
        setPageCount(Math.ceil(response.data.count / itemsPerPage));
        setIsLoading(false);
      } catch (error) {
        alert("Couldn't get pizzas :(");
      }
    })();
  }, [searchValue, isAsc, sortBy, activeCategory, currentPage]);

  useEffect(() => {
    setActiveCategory(0);
  }, [searchValue]);
  //fix later

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <Sort isSelected={sortBy} setIsSelected={setSortBy} isAsc={isAsc} setIsAsc={setIsAsc} />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">{isLoading ? skeletonBlocks : pizzaBlocks}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(page) => onChangePage(page)}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Home;
