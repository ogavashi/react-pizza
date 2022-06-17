import { useState } from "react";

const Categories = () => {
  const categories = ["All", "Meat", "Veg", "Grill", "Spicy", "Stuffed"];
  const [activeCategory, setaActiveCategory] = useState(0);

  const onClickCategory = (index) => {
    setaActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={activeCategory === index ? "active" : ""}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
