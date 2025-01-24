import React, { useState } from "react";
import "./signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("signin");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAuthentication = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/affiliate";

    try {
      if (formState === "signin") {
        const res = await axios.post(`${url}/signin`, formData);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          setToken(localStorage.getItem("token"));
          navigate("/add");
        }
      } else {
        const res = await axios.post(`${url}/signup`, formData);
        if (res.status === 200) {
          setFormState("signin");
        }
      }
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials. Please check your email or password.");
    }
  };

  return (
    <div className="form-wrapper">
      {token ? (
        <div>
          <h1>Welcome to Admin Panel</h1>
        </div>
      ) : (
        <form onSubmit={handleAuthentication}>
          <header>
            {formState === "signin" ? <h3>Sign in</h3> : <h3>Sign up</h3>}
          </header>

          <section className="form-elements">
            {formState === "signin" ? (
              <></>
            ) : (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="emaul"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {formState === "signin" ? (
              <></>
            ) : (
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            )}
          </section>
          <button>{formState === "sigin" ? "Sign in" : "Sign up"}</button>
          {formState === "signin" ? (
            <p>
              Don't have an account?{" "}
              <span onClick={() => setFormState("signup")}>Sign up here.</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setFormState("signin")}>Sign in here</span>
            </p>
          )}

          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Signin;
