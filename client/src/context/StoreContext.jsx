import { createContext } from "react";
import { food_list } from "../menu-list";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const contextValue = {};

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
