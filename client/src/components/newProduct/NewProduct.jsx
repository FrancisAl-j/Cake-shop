import React, { useEffect, useState } from "react";
import "./newProduct.css";
import axios from "axios";

const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchNewFood();
  }, []);

  const fetchNewFood = async () => {
    try {
      const res = await axios.get(
        "https://cake-shop-backend-klrk.onrender.com/api/food/new"
      );
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new-container">
      {data.length !== 0 && <h1>New Products</h1>}

      <div className="item-wrapper">
        {data.map((item, index) => {
          return (
            <div className="item-container" key={index}>
              <img src={item.image} alt="" />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewProduct;
