import { useContext, useEffect, useRef, useState } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../foodItem/FoodItem";
import ReactPaginate from "react-paginate";
import axios from "axios";

const FoodDisplay = ({ category }) => {
  const { food_list, pageCount, handlePageClick, query, setQuery, sales } =
    useContext(StoreContext);

  const [cakeId, setCakeId] = useState([]);

  /*useEffect(() => {
    sales.map((sale) => {
      sale.products.map((cake) => {
        //console.log(cake);
        setCakeId([...cakeId, cake]);
      });
    });
  }, []);

  console.log("Cake ID: " + cakeId); */

  return (
    <div className="food-display" id="food-display">
      <h2>Top cakes near you</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for your desired cake"
      />
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            const matchingSales = sales?.find((sale) =>
              sale.products?.includes(item._id)
            );

            const salePrice =
              matchingSales && matchingSales.saleRate
                ? item.price - item.price * matchingSales.saleRate
                : item.price;

            const rate = matchingSales && matchingSales.saleRate;

            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={salePrice}
                image={item.image}
                saleImage={matchingSales ? "image" : ""}
                rate={rate}
              />
            );
          }
        })}
      </div>

      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default FoodDisplay;
