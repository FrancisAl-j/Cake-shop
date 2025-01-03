import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    cartItemDetails,
    sales,
  } = useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItemDetails && food_list.length > 0 ? (
          cartItemDetails.map((item, index) => {
            if (cartItems[item._id] > 0 && item) {
              const matchingSales = sales?.find((sale) =>
                sale.products?.includes(item._id)
              );

              const salePrice =
                matchingSales && matchingSales.saleRate
                  ? item.price - item.price * matchingSales.saleRate
                  : item.price;

              // Check if item exists
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img
                      src={`http://localhost:3000/images/${item.image}`}
                      alt=""
                    />
                    <p>{item.name}</p>
                    <p>₱ {salePrice}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{salePrice * cartItems[item._id]}</p>
                    <p
                      onClick={() => removeFromCart(item._id)}
                      className="cross"
                    >
                      x
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
