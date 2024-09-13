import Search from "../assets/search.svg";
import Basket from "../assets/basket.svg";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import Profile from "../assets/profile.svg";
import Logout from "../assets/logout.svg";
import Bag from "../assets/bag.svg";
import { useNavigate } from "react-router-dom";

const Nav = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken, setCartItems } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/");
  };

  return (
    <header>
      <nav>
        <h1>Cake Shop</h1>

        <ul>
          <Link to="/">
            <li
              onClick={() => setMenu("Home")}
              className={menu === "Home" ? "active" : ""}
            >
              Home
            </li>
          </Link>

          <li
            onClick={() => setMenu("About")}
            className={menu === "About" ? "active" : ""}
          >
            About
          </li>

          <a href="#explore-menu">
            <li
              onClick={() => setMenu("Menu")}
              className={menu === "Menu" ? "active" : ""}
            >
              Menu
            </li>
          </a>

          <a href="#footer">
            <li
              onClick={() => setMenu("Contact-us")}
              className={menu === "Contact-us" ? "active" : ""}
            >
              Contact us
            </li>
          </a>
        </ul>

        <div className="nav-right">
          <img src={Search} alt="search" />
          <Link to="/cart">
            <div className="nav-search-icon">
              <img src={Basket} alt="basket" />
              <div className={getTotalCartAmount() ? "dot" : ""}></div>
            </div>
          </Link>
          {!token ? (
            <button className="signinBtn" onClick={() => setShowLogin(true)}>
              Sign in
            </button>
          ) : (
            <div className="navbar-profile">
              <img src={Profile} alt="" />
              <ul className="nav-profile-dropdown">
                <li>
                  <img src={Bag} alt="" />
                  <p>Order</p>
                </li>
                <hr />
                <li onClick={handleLogout}>
                  <img src={Logout} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
