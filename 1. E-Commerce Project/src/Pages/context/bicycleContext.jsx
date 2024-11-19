import { createContext, useState, useContext } from "react";

export const bicycleContext = createContext(null);
export const SearchProvider = bicycleContext.Provider;

const BicycleContext = ({ children }) => {
  const [bicycle, setBicycle] = useState([]);
  const [searchText, setSearchText] = useState("");

  return (
    <SearchProvider
      value={{
        bicycle,
        setBicycle,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </SearchProvider>
  );
};

export const bicycleTheme = () => {
  return useContext(bicycleContext);
};

export default BicycleContext;
