import { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/food/list");
      setFoods(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id, item) => {
    try {
      if (window.confirm(`Are you sure you want to remove ${item}`)) {
        const res = await axios.delete(
          `http://localhost:3000/api/food/delete/${id}`
        );
        await fetchFood();
        if (res.status === 200) {
          toast.success("Product successfuly deleted");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            <p
              className="cursor"
              onClick={() => handleRemove(food._id, food.name)}
            >
              X
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
