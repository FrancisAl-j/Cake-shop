import React, { useRef, useState } from "react";
import "./updateCake.css";
import axios from "axios";

const UpdateCake = ({
  id,
  name,
  price,
  category,
  description,
  itemImage,
  setProductId,
  fetchFood,
}) => {
  const [productImage, setProductImage] = useState(itemImage);
  const [formData, setFormData] = useState({
    name: name,
    price: price,
    description: description,
    image: productImage,
    category: category,
  });

  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append("name", formData.name);
    updatedFormData.append("price", formData.price);
    updatedFormData.append("category", formData.category);
    updatedFormData.append("description", formData.description);

    // Check if a new image is selected
    if (productImage) {
      updatedFormData.append("image", productImage);
    }
    try {
      const res = await axios.put(
        `https://cake-shop-backend-klrk.onrender.com/api/food/update/${id}`,
        updatedFormData
      );
      if (res.status === 200) {
        await fetchFood();
        setProductId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*  productImage
                ? `http://localhost:3000/images/${productImage}`
                : `http://localhost:3000/images/${itemImage}` */

  return (
    <div className="update-form">
      <form onSubmit={handleUpdate}>
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
            name="image"
            ref={fileRef}
            onChange={(e) => setProductImage(e.target.files[0])}
            hidden
          />
          <img
            src={
              productImage instanceof File
                ? URL.createObjectURL(productImage)
                : `https://cake-shop-backend-klrk.onrender.com/images/${formData.image}`
            }
            alt=""
            onClick={() => fileRef.current.click()}
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="pair-elements">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Cake">Cake</option>
              <option value="Cup Cake">Cup Cake</option>
              <option value="Bread">Bread</option>
              <option value="Designed Cake">Designed Cake</option>
            </select>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
          ></textarea>
        </section>
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateCake;
