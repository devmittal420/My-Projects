// make a project in which we have to shown a cycle details and images.
// by using react i have to make a project
// first i have create a json format in which a image, name, description, price, ratings are shown
// then i have to shown a add to cart features and buy button in that.

import { useEffect, useState, useLayoutEffect } from "react";
import BicycleData from "./../../components/API/bicycleApi";
import { bicycleTheme } from "../context/bicycleContext";
import { searchTheme } from "/src/Pages/context/searchContext";
import "/src/index.css";
import Fuse from "fuse.js";
import Header from "../../components/Headers/header";

const Bicycle = () => {
  const { bicycle, setBicycle } = bicycleTheme();
  const { searchInput, setSearchInput } = searchTheme();

  useLayoutEffect(() => {
    setBicycle(BicycleData);
    console.log("Bicycle homepage re-render2");
  }, []);

  console.log("Bicycle homepage re-render");

  const fuseSearch = {
    keys: ["name", "description"],
  };

  const fuse = new Fuse(bicycle, fuseSearch);

  const searchBicycles = searchInput
    ? fuse.search(searchInput).map((result) => result.item)
    : bicycle;

  return (
    <div className="p-20 mt-4 bg-blue-100">
      <Header />
      <div className="grid gap-1">
        {searchBicycles.length > 0 ? (
          searchBicycles.map((cycle) => (
            <div
              key={cycle.id}
              className="flex border border-l-0  border-yellow-100 rounded-full p-4"
            >
              {/* Image Container */}
              <div className="h-44 w-72 border-r-2 rounded-3xl mr-8 flex-shrink-0 ">
                <img
                  src={cycle.image}
                  alt={cycle.name}
                  className="h-full w-full object-contain mix-blend-darken"
                />
              </div>
              {/* Text Container */}
              <div className="mr-40 mb-4">
                <a href="">
                  <p className="text-lg text-blue-500">{cycle.description}</p>
                </a>
                <div className="flex">
                  <p className="text-xl mt-5">{cycle.price}</p>
                  <p className="mt-7 ml-1 text-xs">M.R.P.</p>
                </div>

                <p className="mt-5 text-yellow-500">Rating: {cycle.rating}⭐</p>
                <button className="bg-yellow-300 h-7 w-24 mt-4 rounded-full font-serif p-1">
                  Add to cart
                </button>
                <button className="bg-yellow-300 h-7 w-24 mt-4 ml-3 rounded-full font-serif p-1">
                  Buy now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Results Found</p>
        )}
      </div>
    </div>
  );
};
export default Bicycle;
