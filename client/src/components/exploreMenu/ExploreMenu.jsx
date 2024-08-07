import "./exploreMenu.css";
import { menu_list } from "../../menu-list";

const ExploreMenu = () => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p>Choose from our diverse menus</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.menu_img} alt="foods" />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
