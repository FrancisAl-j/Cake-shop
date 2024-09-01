import "./sidebar.css";
import List from "../../assets/list.svg";
import Orders from "../../assets/orders.svg";
import Add from "../../assets/add.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <div className="sidebar-option">
          <img src={Add} alt="" />
          <p>Add Items</p>
        </div>

        <div className="sidebar-option">
          <img src={List} alt="" />
          <p>List Items</p>
        </div>

        <div className="sidebar-option">
          <img src={Orders} alt="" />
          <p>Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
