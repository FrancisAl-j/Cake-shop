import { useContext, useEffect, useState } from "react";
import "./myOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import Parcel from "../../assets/parcel.svg";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/order/userorders",
        { headers: { token } }
      );

      if (res.status === 200) {
        setData(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={Parcel} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>₱{order.amount}</p>
              <p>Total Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
