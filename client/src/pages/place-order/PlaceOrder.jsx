import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./placeOrder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email" />

        <input type="text" placeholder="Street" />
        <div className="multi-field">
          <input type="text" placeholder="Barangay" />
          <input type="text" placeholder="City" />
        </div>
        <input type="number" placeholder="Zip Codes" />
        <input type="number" placeholder="Phone Number" />
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
                ₱ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
