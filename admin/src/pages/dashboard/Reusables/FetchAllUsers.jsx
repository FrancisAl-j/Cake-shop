import React, { useEffect, useState } from "react";
import Users from "../../../assets/users.svg";
import axios from "axios";

const FetchAllUsers = () => {
  const [users, setUsers] = useState(0);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("https://cake-shop-backend-klrk.onrender.com/api/user/users");
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container users">
      <h3>Customers</h3>
      <div className="data">
        <img src={Users} alt="" />
        <p>{users}</p>
      </div>
    </div>
  );
};

export default FetchAllUsers;
