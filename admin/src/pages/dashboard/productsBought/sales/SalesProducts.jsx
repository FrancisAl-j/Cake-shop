import React, { useEffect, useState } from "react";
import "./salesProduct.css";
import axios from "axios";

const SalesProducts = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(3);
  const [saleRate, setSaleRate] = useState(0.7);
  const [foods, setFoods] = useState([]);
  const [saleCakes, setSaleCakes] = useState({});
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchAllSaleCakes();
  }, []);

  const fetchAllSaleCakes = async () => {
    try {
      const res = await axios.get("https://cake-shop-backend-klrk.onrender.com/api/sales/all");

      if (res.status === 200) {
        setSales(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(sales.length);

  useEffect(() => {
    fetchProductsBuys();
    fetchSaleCakes();
  }, []);

  const fetchProductsBuys = async () => {
    try {
      const res = await axios.get("https://cake-shop-backend-klrk.onrender.com/api/food/list");
      if (res.status === 200) {
        setFoods(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSaleCakes = async () => {
    try {
      const res = await axios.get("https://cake-shop-backend-klrk.onrender.com/api/sales/get", {
        headers: { token },
      });
      if (res.status === 200) {
        setSaleCakes(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        "https://cake-shop-backend-klrk.onrender.com/api/sales/create",
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
        await fetchSaleCakes();
        await fetchProductsBuys();
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

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this sale?")) {
        const res = await axios.delete(
          `https://cake-shop-backend-klrk.onrender.com/api/sales/delete/${id}`
        );

        if (res.status === 200) {
          await fetchAllSaleCakes();
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="sales-list">
        <h1>Cakes to put on sale</h1>
        <div className="title-container">
          <h2>Cakes</h2>
          <h2>Name</h2>
          <h2>Price</h2>
          <h2>Bought</h2>
        </div>
        {saleCakes && foods.length > 0 && (
          <div>
            {foods &&
              foods.map((food, index) => {
                if (saleCakes[food._id]) {
                  return (
                    <div className="food-container" key={index}>
                      <img
                        src={`https://cake-shop-backend-klrk.onrender.com/images/${food.image}`}
                        alt=""
                      />
                      <p>{food.name}</p>
                      <p>₱ {food.price}</p>
                      <p>{food.buys}</p>
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

        <div>{sales.length === 0 ? <></> : <h1>Cakes on sale</h1>}</div>
        <div>
          {sales &&
            sales.map((sale, index) => {
              return (
                <div className="food-container" key={index}>
                  <h1>{sale._id}</h1>
                  {sale.saleRate === 0.3 ? (
                    <p>30%</p>
                  ) : sale.saleRate === 0.5 ? (
                    <p>50%</p>
                  ) : sale.saleRate === 0.7 ? (
                    <p>70%</p>
                  ) : (
                    <></>
                  )}
                  <button onClick={() => handleDelete(sale._id)}>Delete</button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SalesProducts;
