import React, { useEffect, useState } from "react";
import "./fetchFoods.css";
import axios from "axios";
import { toast } from "react-toastify";
import SalesProducts from "./sales/SalesProducts";

const FetchFoods = ({ token }) => {
  const [foods, setFoods] = useState([]);
  const [saleCakes, setSaleCakes] = useState({});

  useEffect(() => {
    fetchProductsBuys();
    fetchSaleCakes();
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

  const fetchSaleCakes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/sales/get", {
        headers: { token },
      });
      if (res.status === 200) {
        setSaleCakes(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSales = async (itemId) => {
    //e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/sales/add",
        { itemId },
        {
          headers: { token },
        }
      );

      if (res.status === 200) {
        toast.success("Added to sales.");
        await fetchSaleCakes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="food-wrapper">
        <div className="title-container">
          <h2>Cakes</h2>
          <h2>Name</h2>
          <h2>Action</h2>
          <h2>Purchase</h2>
        </div>
        {foods &&
          foods.map((food, index) => {
            return (
              <div className="food-container" key={index}>
                <img
                  src={`http://localhost:3000/images/${food.image}`}
                  alt=""
                />
                <p>{food.name}</p>
                <button onClick={() => handleAddSales(food._id)}>
                  Sale Item
                </button>

                <p>{food.buys}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default FetchFoods;
