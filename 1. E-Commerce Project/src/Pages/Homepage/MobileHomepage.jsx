import MobileData from "/src/components/API/MobileApi";
import Header from "/src/components/Headers/header";
import { mobileTheme } from "../context/mobileContext";
import { useLayoutEffect, useEffect } from "react";
import { bicycleTheme } from "../context/bicycleContext";
import { searchTheme } from "/src/Pages/context/searchContext";
import Fuse from "fuse.js";

const Mobile = () => {
  const { mobile, setMobile } = mobileTheme();
  const { searchInput } = searchTheme();

  useLayoutEffect(() => {
    setMobile(MobileData);
  }, [setMobile]);

  const fuseSearch = {
    keys: ["name", "description"],
    includeScore: true,
  };

  const fuse = new Fuse(mobile, fuseSearch);

  const searchMobile = searchInput
    ? fuse.search(searchInput).map((result) => result.item)
    : mobile;


  return (
    <div className="p-20 mt-4">
      <Header />
      <div className="grid gap-1">
        {searchMobile.length > 0 ? (
          searchMobile.map((mob) => (
            <div
              key={mob.id}
              className="flex h-60 border border-l-0 border-yellow-100 rounded-full"
            >
              {/* Image Container */}
              <div className="border-r-2 rounded-3xl mr-8 flex-shrink-0 ">
                <img
                  src={mob.image}
                  alt={mob.name}
                  className="h-60 ml-5 w-56 object-contain"
                />
              </div>
              {/* Text Container */}
              <div className="mr-40 mb-4">
                <a href="">
                  <p className="text-lg text-blue-500">{mob.description}</p>
                </a>
                <div className="flex">
                  <p className="text-xl mt-5">{mob.price}</p>
                  <p className="mt-7 ml-1 text-xs">M.R.P.</p>
                </div>

                <p className="mt-5 text-yellow-500">Rating: {mob.rating}⭐</p>
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
          <p>No Mobile Found</p>
        )}
      </div>
    </div>
  );
};

export default Mobile;
