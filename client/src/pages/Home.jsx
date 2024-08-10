import { useState } from "react";
import ExploreMenu from "../components/exploreMenu/ExploreMenu";
import Header from "../header/header";
import FoodDisplay from "../components/foodDisplay/FoodDisplay";
import "./home.css";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="home-container">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Home;
