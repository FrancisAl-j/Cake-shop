import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/cart/Cart";
import OrderPlace from "./pages/place-order/PlaceOrder";
import Footer from "./components/footer/Footer";
import LoginPopUp from "./components/loginPopUp/LoginPopUp";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/myOrder/MyOrders";
import { useState } from "react";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      <main>
        {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
        <Nav setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderPlace />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
