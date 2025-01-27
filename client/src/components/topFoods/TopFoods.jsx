import axios from "axios";
import { useEffect, useState } from "react";
import "./topFoods.css";
import Crown from "../../assets/crown.svg";

const TopFoods = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchTopProduct();
  }, []);

  const fetchTopProduct = async () => {
    try {
      const res = await axios.get(
        "https://cake-shop-backend-klrk.onrender.com/api/top/foods"
      );
      if (res.status === 200) {
        setTopProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="top-container">
      <h1>Top products</h1>
      <div className="item-wrapper">
        {topProducts.map((item, index) => {
          return (
            <div key={index} className="item-container">
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p className="price">₱{item.price}</p>
              <img src={Crown} alt="" className="crown" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopFoods;
