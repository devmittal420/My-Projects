import { Link } from "react-router-dom";
import { bicycleTheme } from "/src/Pages/context/bicycleContext";
import { searchTheme } from "../../Pages/context/searchContext";
import { memo } from "react";

const Header = () => {
  const { searchText, setSearchText } = bicycleTheme();
  const { searchInput, setSearchInput } = searchTheme();

  console.log("Header Re-render");

  const onHandleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
    
    if (value.length === 0) {
      setSearchInput("");
    }
  };

  const onSearchClick = () => {
    setSearchInput(searchText);
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-20 right-0 bg-blue-400 z-10 ">
        {/* E-commerce Logo */}
        <div className="flex items-center justify-between mt-3">
          <Link to="/">
            <img
              src="https://icon2.cleanpng.com/20190304/hpe/kisspng-shopping-cart-shopping-bag-online-shopping-paper-1713903155861.webp"
              alt="Amazon Logo"
              className="h-14 ml-3 bg-transparent border rounded-full"
            />
          </Link>

          {/* Search bar */}
          <div className="flex items-center relative">
            <input
              type="search"
              placeholder="Search here"
              className="bg-white border border-transparent rounded-l-xl w-128 h-10 px-4 cursor-pointer"
              onChange={onHandleSearch}
              value={searchText}
            />
            <button
              onClick={onSearchClick}
              className="bg-yellow-400 h-10 px-3 rounded-r-xl"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/search.png"
                alt="search-image"
                className="h-5 w-5"
              />
            </button>
          </div>

          {/* Cart */}
          <div>
            <Link to="/cart" className="flex items-center mr-6 p-2 border ">
              <img
                src="https://img.icons8.com/?size=32&id=15893&format=png"
                alt="cart-icon-image"
                className=""
              />
              <p>Cart</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
