import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bicycle from "./Pages/Homepage/BicycleHomepage";
import BicycleContext from "./Pages/context/bicycleContext";
import Header from "./components/Headers/header";
import CartContext from "./Pages/context/cartContext";
import CartPage from "./Pages/Homepage/cartPage";
import MainpageItem from "./Pages/Mainpage/MainpageSlider/mainpageItem";
import SliderContext from "./Pages/context/sliderContext";
import Mobile from "./Pages/Homepage/MobileHomepage";
import MobileContext from "./Pages/context/mobileContext";
import SearchContext from "./Pages/context/searchContext";

const router = createBrowserRouter([
  {
    path: "/bicycle",
    element: <Bicycle />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/",
    element: <MainpageItem />,
  },
  {
    path: "/mobile",
    element: <Mobile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <BicycleContext>
    <CartContext>
      <SliderContext>
        <MobileContext>
          <SearchContext>
            <RouterProvider router={router} />
          </SearchContext>
        </MobileContext>
      </SliderContext>
    </CartContext>
  </BicycleContext>
);
