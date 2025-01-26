import React, { useEffect, useState } from "react";
import "./receipt.css";
import axios from "axios";

const Receipt = ({ id, setOrderId }) => {
  const [order, setOrder] = useState(null);
  const url = "https://cake-shop-backend-klrk.onrender.com";

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${url}/api/order/receipt/${id}`);

      if (res.status === 200) {
        setOrder(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="receipt-container">
      <section className="receipt-wrapper">
        <header>
          <h1>Clanginess</h1>
          <h3 onClick={() => setOrderId(null)}>X</h3>
        </header>
        {order && (
          <div className="order-contents">
            <div className="order-info">
              <div className="user-info">
                <h5>Billed to:</h5>
                {order.address && (
                  <>
                    <p>
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p>
                      {order.address.barangay}, {order.address.street},{" "}
                      {order.address.city}
                    </p>
                    <p>{order.address.zipcode}</p>
                  </>
                )}
              </div>

              <div className="receipt-info">
                <h2>Receipt:</h2>
                <p>Order id: {order._id}</p>
              </div>
            </div>

            <div className="order-details">
              <div className="details-header grid">
                <p>QTY</p>
                <p>Items</p>
                <p>Price</p>
                <p>Amount</p>
              </div>

              <div className="order-items">
                {order.items &&
                  order.items.map((food, index) => {
                    return (
                      <div className="grid" key={index}>
                        <p>{food.quantity}</p>
                        <p>{food.name}</p>
                        <p>₱ {food.price}</p>
                        <p>₱ {food.price * food.quantity}</p>
                      </div>
                    );
                  })}
              </div>
              <h1>Total: ₱ {order.amount}</h1>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Receipt;
