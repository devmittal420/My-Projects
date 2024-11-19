import React from "react";
import "/src/index.css";
import { sliderContext } from "/src/Pages/context/sliderContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "/src/components/Headers/header";
import { bicycleTheme } from "../../context/bicycleContext";

const MainpageItem = () => {
  const { bicycle, setBicycle } = bicycleTheme();
  return (
    <div>
      <Header />
      <div className="slider flex justify-center items-center mt-36">
        <div className="slider-box w-60">
          <Link to="/bicycle" className="absolute rotate-y-0 ">
            <img
              src="https://m.media-amazon.com/images/I/61h2q3SFFVL._SX679_.jpg"
              alt="Bicycle"
              className="border rounded-extra-lg shadow-custom-red w-60 h-52 hover:scale-125 hover:shadow-gray-400 transition-transform duration-300"
            />
          </Link>
          <Link to="/mobile" className="absolute rotate-y-72">
            <img
              src="https://m.media-amazon.com/images/I/81+GIkwqLIL._SX679_.jpg"
              alt="Iphone"
              className="border rounded-extra-lg shadow-custom-red w-60 h-52 hover:scale-125 hover:shadow-gray-400 transition-transform duration-300"
            />
          </Link>
          <Link to="/bicycle" className="absolute rotate-y-144">
            <img
              src="https://m.media-amazon.com/images/I/61h2q3SFFVL._SX679_.jpg"
              alt="Image 3"
              className="border rounded-extra-lg shadow-custom-red w-60 h-52 hover:scale-125 hover:shadow-gray-400 transition-transform duration-300"
            />
          </Link>
          <Link to="/bicycle" className="absolute rotate-y-216">
            <img
              src="https://m.media-amazon.com/images/I/61h2q3SFFVL._SX679_.jpg"
              alt="Image 4"
              className="border rounded-extra-lg shadow-custom-red w-60 h-52 hover:scale-125 hover:shadow-gray-400 transition-transform duration-300"
            />
          </Link>
          <Link to="/bicycle" className="absolute rotate-y-288">
            <img
              src="https://m.media-amazon.com/images/I/61h2q3SFFVL._SX679_.jpg"
              alt="Image 5"
              className="border rounded-extra-lg shadow-custom-red w-60 h-52 hover:scale-125 hover:shadow-gray-400 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainpageItem;
