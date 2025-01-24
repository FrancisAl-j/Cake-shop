import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./placeOrder.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    cartItemDetails,
    cartItems,
    fetchCartItems,
  } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    barangay: "",
    zipcode: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Online payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    let orderItems = [];
    cartItemDetails.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: formData,
      items: orderItems,
      amount: getTotalCartAmount() + 36,
    };

    const res = await axios.post(
      `https://cake-shop-backend-klrk.onrender.com/api/order/place`,
      orderData,
      { headers: { token } }
    );
    if (res.status === 201) {
      window.location.href = res.data.checkoutUrl;
    } else {
      alert("Error");
    }
  };

  // Cash On Delivery (COD)
  const handleCOD = async (e) => {
    e.preventDefault();
    let orderItems = [];

    cartItemDetails.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: formData,
      items: orderItems,
      amount: getTotalCartAmount() + 36,
    };
    try {
      const res = await axios.post(
        "https://cake-shop-backend-klrk.onrender.com/api/order/COD",
        orderData,
        {
          headers: { token },
        }
      );

      if (res.status === 200) {
        await fetchCartItems();
        navigate("/myorders");

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input
            required
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          required
          type="text"
          placeholder="Street"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
        <div className="multi-field">
          <input
            required
            type="text"
            placeholder="Barangay"
            name="barangay"
            value={formData.barangay}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <input
          required
          type="number"
          placeholder="Zip Codes"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
        />
        <input
          required
          type="number"
          placeholder="Phone Number"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₱ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₱ {getTotalCartAmount() === 0 ? 0 : 36}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <p>
                ₱ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 36}
              </p>
            </div>
          </div>
          {/* <button type="submit">PROCEED TO PAYMENT</button> */}
          <button type="button" onClick={handleCOD}>
            Cash On Delivery (COD)
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
