import { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";

const List = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food/list");
        setFoods(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFood();
  }, []);
  return (
    <div className="list add flex-col">
      <h1>List</h1>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
      </div>
      {foods.map((food, index) => {
        return (
          <div key={index} className="list-table-format">
            <img src={`http://localhost:3000/images/${food.image}`} alt="" />
            <p>{food.name}</p>
            <p>{food.category}</p>
            <p>₱{food.price}</p>
            <p>X</p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
