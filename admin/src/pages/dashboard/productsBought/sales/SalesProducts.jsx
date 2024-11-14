import React, { useEffect, useState } from "react";
import "./salesProduct.css";
import axios from "axios";

const SalesProducts = ({ saleCakes, foods, token }) => {
  console.log(saleCakes);
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(3);
  const [saleRate, setSaleRate] = useState(0.7);

  useEffect(() => {
    const productIds = foods.reduce((acc, food) => {
      if (saleCakes[food._id]) {
        acc.push(food._id); // Collect the _id
      }
      return acc;
    }, []);
    setProducts(productIds); // Update state with the array of IDs
  }, [saleCakes, foods]);

  const handleSales = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/sales/create",
        {
          products,
          date,
          saleRate,
        },
        {
          headers: { token },
        }
      );

      if (res.status === 200) {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleRateChange = (e) => {
    setSaleRate(e.target.value);
  };

  console.log(date);

  return (
    <section className="sales-list">
      {saleCakes && foods.length > 0 && (
        <div>
          {foods &&
            foods.map((food, index) => {
              if (saleCakes[food._id]) {
                return (
                  <div key={index}>
                    <p>{food.name}</p>
                  </div>
                );
              }
            })}
        </div>
      )}

      <select value={date} onChange={handleChange}>
        <option value={3}>3</option>
        <option value={7}>7</option>
        <option value={30}>30</option>
      </select>

      <select value={saleRate} onChange={handleRateChange}>
        <option value={0.3}>30%</option>
        <option value={0.5}>50%</option>
        <option value={0.7}>70%</option>
      </select>

      <button onClick={handleSales}>Put To Sale</button>
    </section>
  );
};

export default SalesProducts;
