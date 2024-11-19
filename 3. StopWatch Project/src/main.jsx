import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import StopwatchContext from "./Pages/context/stopwatchContext";
import StopwatchHomepage from "./Pages/Homepage/stopwatchhomepage";
import "./index.css";

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
