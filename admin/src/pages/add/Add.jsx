import "./add.css";
import AddImage from "../../assets/addImage.jpg";

const Add = () => {
  return (
    <div className="add">
      <form className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={AddImage} alt="" />
          </label>
          <input type="file" id="image" hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" name="name" placeholder="Type here" />
        </div>

        <div className="add-product-decsription flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category">
              <option value="Cake">Cake</option>
              <option value="Cup Cake">Cup Cake</option>
              <option value="Bread">Bread</option>
              <option value="Designed Cake">Designed Cake</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input type="number" name="price" />
          </div>
        </div>

        <button className="add-btn">ADD PRODUCT</button>
      </form>
    </div>
  );
};

export default Add;
