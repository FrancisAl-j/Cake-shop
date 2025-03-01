import { menu_list } from "../../menu-list";
import "./foodItem.css";
import Star from "../../assets/star.png";
import Plus from "../../assets/plus.png";
import PlusGreen from "../../assets/plus-green.png";
import MinusRed from "../../assets/minus-red.png";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, salePrice, rate }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item" key={id}>
      <div className="food-item-img-container">
        {rate && (
          <div className="sale-container">
            <p className="sale">Sale!!!</p>
            {rate === 0.3 ? (
              <p className="percent">30%</p>
            ) : rate === 0.5 ? (
              <p className="percent">50%</p>
            ) : rate === 0.7 ? (
              <p className="percent">70%</p>
            ) : (
              <></>
            )}
          </div>
        )}

        <img className="food-item-image" src={image} alt="" />
        {!cartItems[id] ? (
          <div className="plus-container">
            <img
              className="plus"
              src={Plus}
              onClick={() => addToCart(id)}
              alt=""
            />
          </div>
        ) : (
          <div className="count-container">
            <img
              className="minus-red"
              src={MinusRed}
              onClick={() => removeFromCart(id)}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              className="plus-green"
              src={PlusGreen}
              onClick={() => addToCart(id)}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={Star} alt="star" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₱ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
