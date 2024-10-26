import React, { useState } from "react";
import "./signin.css";
import axios from "axios";

const Signin = () => {
  const [formState, setFormState] = useState("signin");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="form-wrapper">
      <form>
        <header>
          {formState === "signin" ? <h3>Sign in</h3> : <h3>Sign up</h3>}
        </header>

        <section className="form-elements">
          {formState === "signin" ? (
            <></>
          ) : (
            <input type="text" name="name" placeholder="Name" required />
          )}

          <input type="emaul" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {formState === "signin" ? (
            <></>
          ) : (
            <select name="role" required>
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
      </form>
    </div>
  );
};

export default Signin;
