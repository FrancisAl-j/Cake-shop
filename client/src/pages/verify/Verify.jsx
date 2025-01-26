import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import "./verify.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { token } = useContext(StoreContext);

  const verifyPayment = async () => {
    const res = await axios.post(
      `/api/order/verify`,
      {
        success,
        orderId,
      },
      { headers: { token } }
    );
    if (res.status === 200) {
      navigate("/myorders");
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (token) {
      verifyPayment();
    }
  }, [token]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
