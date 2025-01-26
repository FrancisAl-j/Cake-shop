import { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const [cartItemDetails, setCartItemDetails] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [sales, setSales] = useState([]);
  const currentPage = useRef();

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
        "https://cake-shop-backend-klrk.onrender.com/api/cart/add",
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
        "https://cake-shop-backend-klrk.onrender.com/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    if (!food_list.length || !Object.keys(cartItems).length) return 0; // Handle cases where data might not be fully loaded

    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let foodInfo = food_list.find((product) => product._id === item);
        if (foodInfo) {
          const sale = sales.find((saleItem) =>
            saleItem.products.includes(item)
          );
          const saleRate = sale ? sale.saleRate : 1; // Use saleRate if on sale, otherwise default to 1 (no discount)
          totalAmount += foodInfo.price * cartItems[item] * saleRate;
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    currentPage.current = 1;
    const loadData = async () => {
      await paginatedFood();
      await fetchFood();
      await fetchSaleCakes();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await fetchCartItems(localStorage.getItem("token"));
      }
    };

    loadData();
  }, [query]);

  const handlePageClick = async (e) => {
    currentPage.current = e.selected + 1;
    await paginatedFood();
  };

  const paginatedFood = async () => {
    try {
      const res = await axios.get(
        `https://cake-shop-backend-klrk.onrender.com/api/food/paginate/foods?page=${currentPage.current}&limit=${limit}`,
        {
          params: { query },
        }
      );
      if (res.status === 200) {
        setFood_list(res.data.result);
        setPageCount(res.data.results.pageCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFood = async () => {
    try {
      const res = await axios.get(
        "https://cake-shop-backend-klrk.onrender.com/api/food/list"
      );
      if (res.status === 200) {
        setCartItemDetails(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartItems = async (token) => {
    try {
      const res = await axios.post(
        "https://cake-shop-backend-klrk.onrender.com/api/cart/get",
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

  const fetchSaleCakes = async () => {
    try {
      const res = await axios.get(
        "https://cake-shop-backend-klrk.onrender.com/api/sales/all"
      );

      if (res.status === 200) {
        setSales(res.data);
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
    pageCount,
    handlePageClick,
    query,
    setQuery,
    cartItemDetails,
    sales,
    fetchCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
