import "./sidebar.css";
import List from "../../assets/list.svg";
import Orders from "../../assets/orders.svg";
import Add from "../../assets/add.svg";
import Dashboard from "../../assets/dashboard.svg";
import { NavLink } from "react-router-dom";

const Sidebar = ({ token }) => {
  return (
    <>
      {!token ? (
        <></>
      ) : (
        <div className="sidebar">
          <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">
              <img src={Add} alt="" />
              <p>Add Items</p>
            </NavLink>

            <NavLink to="/list" className="sidebar-option">
              <img src={List} alt="" />
              <p>List Items</p>
            </NavLink>

            <NavLink to="/orders" className="sidebar-option">
              <img src={Orders} alt="" />
              <p>Orders</p>
            </NavLink>

            <NavLink to="/dashboard" className="sidebar-option">
              <img src={Dashboard} alt="" />
              <p>Dashboard</p>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
