import React, { useEffect, useState } from "react";
import Cart from "../../../assets/cart-check.svg";
import axios from "axios";
import "./reusables.css";

const FetchAllOrders = () => {
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get("https://cake-shop-backend-klrk.onrender.com/api/order/all-orders");
      if (res.status === 200) {
        setOrders(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="orders container">
      <h3>Orders</h3>
      <div className="data">
        <img src={Cart} alt="" />
        <p>{orders}</p>
      </div>
    </div>
  );
};

export default FetchAllOrders;
