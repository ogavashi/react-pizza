import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartByID } from "../../redux/slices/cartSlice";

const PizzaBlock = ({ id, title, prices, imageUrl, sizes, types }) => {
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(types[0]);

  const dispatch = useDispatch();

  const items = useSelector(selectCartByID(id));
  const price = activeType === 0 ? prices[activeSize] : Math.floor(prices[activeSize]) * 1.2;
  const quantity = items.reduce((sum, item) => sum + item.count, 0);

  const onClickAddButton = () => {
    const item = {
      id: `${id}${sizes[activeSize]}`,
      title,
      price,
      imageUrl,
      type: typesNames[activeType],
      size: sizes[activeSize],
    };

    dispatch(addItem(item));
  };

  const onClickSize = (sizeIndex) => {
    setActiveSize(sizeIndex);
  };

  const onClickType = (typeIndex) => {
    setActiveType(typeIndex);
  };

  const typesNames = ["Thin", "Thick"];

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={`${imageUrl}`} alt={title} />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                onClick={() => onClickType(typeId)}
                className={activeType === typeId ? "active" : ""}
                key={typeId}
              >
                {typesNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => onClickSize(index)}
                className={activeSize === index ? "active" : ""}
                key={index}
              >
                {size} cm.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price} ₴</div>
          <button onClick={onClickAddButton} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add</span>
            {quantity > 0 && <i>{quantity}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
