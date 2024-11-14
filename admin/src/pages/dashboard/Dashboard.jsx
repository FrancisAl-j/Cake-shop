import React from "react";
import StatsContainer from "./Reusables/StatsContainer";
import "./dashboard.css";
import FetchFoods from "./productsBought/FetchFoods";

const Dashboard = ({ token }) => {
  return (
    <div className="dashboard-container">
      <StatsContainer />
      <FetchFoods token={token} />
    </div>
  );
};

export default Dashboard;
