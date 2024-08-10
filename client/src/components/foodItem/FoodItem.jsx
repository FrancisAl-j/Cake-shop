import { menu_list } from "../../menu-list";
import "./foodItem.css";
import Star from "../../assets/star.png";
import { useState } from "react";

const FoodItem = ({ id, name, price, description, image }) => {
  const [itemCounts, setItemCounts] = useState(0);

  return (
    <div className="food-item" key={id}>
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
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
