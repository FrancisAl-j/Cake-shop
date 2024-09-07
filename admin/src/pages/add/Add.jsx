import "./add.css";
import AddImage from "../../assets/addImage.jpg";
import { useState } from "react";
import axios from "axios";

const Add = () => {
  const [image, setImage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Cake",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    const priceNumber = Number(formData.price);
    Data.append("name", formData.name);
    Data.append("description", formData.description);
    Data.append("price", priceNumber);
    Data.append("category", formData.category);
    Data.append("image", image);
    try {
      const res = await axios.post("http://localhost:3000/api/food/add", Data);
      console.log(res.data);
    } catch (error) {
      setError("Something went wrong creating a product");
    }
  };

  return (
    <div className="add">
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : AddImage} alt="" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            accept="image/*"
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            required
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
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

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="add-btn">ADD PRODUCT</button>
      </form>
    </div>
  );
};

export default Add;
