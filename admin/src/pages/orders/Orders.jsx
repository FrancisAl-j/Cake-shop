import { useState } from "react";
import "./orders.css";
import axios from "axios";
import { useEffect } from "react";
import Parcel from "../../assets/parcel.svg";

const Orders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/order/list");
      if (res.status === 200) {
        setData(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (e, orderId) => {
    try {
      const res = await axios.put("http://localhost:3000/api/order/status", {
        orderId,
        status: e.target.value,
      });
      if (res.status === 200) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {data.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={Parcel} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length) {
                      return `${item.name} x ${item.quantity}`;
                    } else {
                      return `${item.name} x ${item.quantity}, `;
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p className="order-item-address">
                  {`${order.address.street}, ${order.address.barangay}, ${order.address.city}. (${order.address.zipcode})`}
                </p>
                <p className="order-item-phone">{order.address.contact}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>₱{order.amount}</p>
              <select
                onChange={(e) => handleUpdateStatus(e, order._id)}
                value={order.status}
              >
                <option value="Processing">Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
