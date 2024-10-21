import React from "react";
import "./reusables.css";
import FetchAllOrders from "./FetchAllOrders";

const StatsContainer = () => {
  return (
    <div className="stats-info">
      <FetchAllOrders />
    </div>
  );
};

export default StatsContainer;
