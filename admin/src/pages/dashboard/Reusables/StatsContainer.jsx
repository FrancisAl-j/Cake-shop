import React from "react";
import "./reusables.css";
import FetchAllOrders from "./FetchAllOrders";
import FetchAllUsers from "./FetchAllUsers";

const StatsContainer = () => {
  return (
    <div className="stats-info">
      <FetchAllOrders />
      <FetchAllUsers />
    </div>
  );
};

export default StatsContainer;
