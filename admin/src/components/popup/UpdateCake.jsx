import React, { useRef, useState } from "react";
import "./updateCake.css";

const UpdateCake = ({
  id,
  name,
  price,
  category,
  description,
  image,
  setProductId,
}) => {
  const [formData, setFormData] = useState({
    name: name,
    price: price,
  });

  const [productImage, setProductImage] = useState(false);

  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="update-form">
      <form>
        <header>
          <h4>Update {name}</h4>
          <p className="close" onClick={() => setProductId(null)}>
            X
          </p>
        </header>

        <section className="form-elements">
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={(e) => setProductImage(e.target.files[0])}
          />
          <img
            src={`http://localhost:3000/images/${image}`}
            alt=""
            onClick={() => fileRef.current.click()}
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </section>
      </form>
    </div>
  );
};

export default UpdateCake;
