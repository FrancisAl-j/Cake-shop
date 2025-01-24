import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      updateStatus();
    }
  }, [token]);

  console.log(token);

  const updateStatus = async () => {
    try {
      const res = await axios.put(
        `https://cake-shop-backend-klrk.onrender.com/api/user/verify/${token}`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Successfully verified</h1>
      <p>Click the link to go back to home page to login</p>
      <Link to="/">Sign in</Link>
    </div>
  );
};

export default VerifyEmail;
