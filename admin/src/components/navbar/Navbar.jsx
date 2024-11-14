import "./navbar.css";
import Profile from "../../assets/profile.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Admin Panel</h1>
      {!token ? (
        <Link to="/">
          <button>Sign in</button>
        </Link>
      ) : (
        <div className="img-navbar">
          <img className="profile" src={Profile} alt="" />
          <div className="navbar-logout">
            <span onClick={handleLogout}>Logout</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
