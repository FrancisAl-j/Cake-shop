import { useSearchParams, useNavigate } from "react-router-dom";
import "./verify.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    const res = await axios.post(`http://localhost:3000/api/order/verify`, {
      success,
      orderId,
    });
    if (res.status === 200) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
