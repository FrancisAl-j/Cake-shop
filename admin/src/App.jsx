import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Orders from "./pages/orders/Orders";
import Dashboard from "./pages/dashboard/Dashboard";
import Signin from "./pages/authentication/Signin";
import SalesProducts from "./pages/dashboard/productsBought/sales/SalesProducts";

// Necessary for toastifying messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState(null || localStorage.getItem("token"));
  const [user, setUser] = useState({});
  return (
    <div className="main">
      <ToastContainer />
      <Navbar token={token} setToken={setToken} />
      <hr />
      <div className="app-content">
        <Sidebar token={token} />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard token={token} />} />
          <Route path="/" element={<Signin setToken={setToken} />} />
          <Route path="/sales" element={<SalesProducts token={token} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
