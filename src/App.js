import Categories from "./components/Categories";
import Header from "./components/Header";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import "./scss/app.scss";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("https://62b18186c7e53744afbaa222.mockapi.io/pizzas");
        const items = response.data;
        setPizzas(items);
      } catch (error) {
        alert("Couldn't get pizzas :(");
      }
    })();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All Pizzas</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaBlock {...pizza} key={pizza.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
