import React, { useEffect, useState } from "react";
import Cart from "../../../assets/cart-check.svg";

const FetchAllOrders = () => {
  const [orders, setOrders] = useState(0);

  useEffect(() => {}, []);
  return (
    <div className="orders-container">
      <img src={Cart} alt="" />
      <p>{orders}</p>
    </div>
  );
};

export default FetchAllOrders;
