import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }

    if (token) {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (token) {
      await axios.post(
        "http://localhost:3000/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let foodInfo = food_list.find((product) => product._id === item);
        totalAmount += foodInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFood();

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await fetchCartItems(localStorage.getItem("token"));
      }
    };

    loadData();
  }, []);

  const fetchFood = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/food/list");
      if (res.status === 200) {
        setFood_list(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartItems = async (token) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/cart/get",
        {},
        {
          headers: { token },
        }
      );
      if (res.status === 200) {
        setCartItems(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
