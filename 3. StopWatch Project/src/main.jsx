import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import StopwatchHomepage from "./Pages/Homepage/stopwatchhomepage";
import "./index.css";
import StopwatchContext from "./Pages/Context/stopwatchContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StopwatchHomepage />,
  },
  {
    path: "/stopwatch",
    element: <StopwatchHomepage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StopwatchContext>
    <RouterProvider router={router} />
  </StopwatchContext>
);
