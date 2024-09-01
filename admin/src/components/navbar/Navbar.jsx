import "./navbar.css";
import Profile from "../../assets/profile.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Admin Panel</h1>
      <img className="profile" src={Profile} alt="" />
    </nav>
  );
};

export default Navbar;
