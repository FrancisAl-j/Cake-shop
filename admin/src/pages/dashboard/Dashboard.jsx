import React from "react";
import StatsContainer from "./Reusables/StatsContainer";
import "./dashboard.css";
import FetchFoods from "./productsBought/FetchFoods";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <StatsContainer />
      <FetchFoods />
    </div>
  );
};

export default Dashboard;
