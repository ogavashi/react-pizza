const Categories = ({ activeCategory, setActiveCategory }) => {
  const categories = ["All", "Meat", "Veg", "Grill", "Spicy", "Stuffed"];

  const onClickCategory = (index) => {
    setActiveCategory(index);
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
