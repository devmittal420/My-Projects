import { createContext, useState, useContext } from "react";

export const searchContext = createContext(null);
export const SearchProvider = searchContext.Provider;

const SearchContext = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchProvider
      value={{
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </SearchProvider>
  );
};

export const searchTheme = () => {
  return useContext(searchContext);
};

export default SearchContext;
