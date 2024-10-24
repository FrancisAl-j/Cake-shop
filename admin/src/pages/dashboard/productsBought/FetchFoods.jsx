import React, { useEffect, useState } from "react";
import "./fetchFoods.css";
import axios from "axios";

const FetchFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchProductsBuys();
  }, []);

  const fetchProductsBuys = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/food/list");
      if (res.status === 200) {
        setFoods(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="title-container">
        <h2>Cakes</h2>
        <h2>Name</h2>
        <h2>Purchase</h2>
      </div>
      {foods &&
        foods.map((food, index) => {
          return (
            <div className="food-container" key={index}>
              <img src={`http://localhost:3000/images/${food.image}`} alt="" />
              <p>{food.name}</p>
              <p>{food.buys}</p>
            </div>
          );
        })}
    </div>
  );
};

export default FetchFoods;
