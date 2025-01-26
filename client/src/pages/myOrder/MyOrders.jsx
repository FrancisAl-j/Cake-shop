import { useContext, useEffect, useState } from "react";
import "./myOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import Parcel from "../../assets/parcel.svg";
import Receipt from "./receipt/Receipt";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const url = "https://cake-shop-backend-klrk.onrender.com";
  const [orderId, setOrderId] = useState(null);

  //

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/userorders`, {
        headers: { token },
      });

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      if (window.confirm("Are you sure you want to cancel this order?")) {
        const res = await axios.delete(
          `https://cake-shop-backend-klrk.onrender.com/api/order/delete/${id}`
        );

        if (res.status === 200) {
          await fetchOrders();
        }
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
              <img src={Parcel} alt="" onClick={() => setOrderId(order._id)} />
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
              <button onClick={() => handleCancelOrder(order._id)}>
                Cancel Order
              </button>
              {orderId === order._id && (
                <Receipt id={order._id} setOrderId={setOrderId} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
