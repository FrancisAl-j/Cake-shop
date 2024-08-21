import Search from "../assets/search.svg";
import Basket from "../assets/basket.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

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
              <div className="dot"></div>
            </div>
          </Link>

          <button className="signinBtn" onClick={() => setShowLogin(true)}>
            Sign in
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
