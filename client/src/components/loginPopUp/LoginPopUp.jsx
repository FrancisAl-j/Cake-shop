import { useContext, useState } from "react";
import "./loginPopUp.css";
import Cross from "../../assets/cross.svg";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const LoginPopUp = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up"); // current state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const api = "https://cake-shop-backend-klrk.onrender.com";
  //https://cake-shop-backend-klrk.onrender.com
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let url;
    try {
      if (currState === "Sign Up") {
        url = `${api}/api/user/register`;
      } else {
        url = `${api}/api/user/login`;
      }

      const res = await axios.post(url, formData);

      if (currState === "Sign Up") {
        if (res.status === 200) {
          setCurrState("Login");
          setSuccess("Register successfully.");
          setError(null);
          setFormData({
            name: "",
            email: "",
            password: "",
          });
        }
      }

      if (currState === "Login") {
        if (res.data.user.active === true) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          setShowLogin(false);
        } else {
          console.log(error);
        }
      }

      /*if (res.status === 200) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
      } else {
        alert(res.data.message);
      }*/
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message);
      }
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={Cross} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button>{currState === "Sign Up" ? "Create User" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the term of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default LoginPopUp;
