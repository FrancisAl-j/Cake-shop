import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/cart/Cart";
import OrderPlace from "./pages/place-order/PlaceOrder";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderPlace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
