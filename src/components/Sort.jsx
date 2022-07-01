import React, { useState, useRef, useEffect } from "react";

export const sortByList = [
  { name: "popularity", sortType: "rating" },
  { name: "price", sortType: "price" },
  { name: "name", sortType: "title" },
];

const Sort = ({ isSelected, setIsSelected, sortOrder, setSortOrder }) => {
  const [isVisible, setIsVisible] = useState(false);

  const sortRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onClickSortCategory = (category) => {
    setIsSelected(category);
    setIsVisible(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          onClick={setSortOrder}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={sortOrder === "desc" ? { transform: "scale(1, -1)" } : {}}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{isSelected.name}</span>
      </div>

      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortByList.map((sortBy, index) => (
              <li
                onClick={() => onClickSortCategory(sortBy)}
                key={index}
                className={isSelected.name === sortBy.name ? "active" : ""}
              >
                {sortBy.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
