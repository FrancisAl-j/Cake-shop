import "./sidebar.css";
import List from "../../assets/list.svg";
import Orders from "../../assets/orders.svg";
import Add from "../../assets/add.svg";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
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
      </div>
    </div>
  );
};

export default Sidebar;
