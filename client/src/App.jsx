import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/cart/Cart";
import OrderPlace from "./pages/place-order/PlaceOrder";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderPlace />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
