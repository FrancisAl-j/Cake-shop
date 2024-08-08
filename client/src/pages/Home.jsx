import { useState } from "react";
import ExploreMenu from "../components/exploreMenu/ExploreMenu";
import Header from "../header/header";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  );
};

export default Home;
