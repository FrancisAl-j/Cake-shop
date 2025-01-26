import "./add.css";
import AddImage from "../../assets/addImage.jpg";
import { useState } from "react";
import axios from "axios";
import { app } from "../../firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useRef } from "react";
import { useEffect } from "react";

const Add = () => {
  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Cake",
  });
  const [error, setError] = useState(null);

  const fileRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    try {
      const uploadSnapshot = await uploadBytes(storageRef, image);

      const downloadURL = await getDownloadURL(uploadSnapshot.ref);

      setImage(downloadURL);
    } catch (error) {
      console.log(error);
    }
  };

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
      const res = await axios.post(
        "https://cake-shop-backend-klrk.onrender.com/api/food/add",
        Data
      );
      if (res.status === 200) {
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "Cake",
        });
        setImage(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>

          <img
            src={image ? image : AddImage}
            alt=""
            onClick={() => fileRef.current.click()}
          />

          <input
            onChange={(e) => setImage(e.target.files[0])}
            ref={fileRef}
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
