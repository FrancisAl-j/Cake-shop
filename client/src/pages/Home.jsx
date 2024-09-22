import { useState } from "react";
import ExploreMenu from "../components/exploreMenu/ExploreMenu";
import Header from "../header/header";
import FoodDisplay from "../components/foodDisplay/FoodDisplay";
import TopFoods from "../components/topFoods/TopFoods";
import NewProduct from "../components/newProduct/NewProduct";
import "./home.css";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="home-container">
      <Header />
      <NewProduct />
      <TopFoods />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Home;
