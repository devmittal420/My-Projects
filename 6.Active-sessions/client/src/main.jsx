import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActiveSession from "./components/activeSessions";

const router = createBrowserRouter([
  {
    path: "/activesession",
    element: <ActiveSession />,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer autoClose="2000" pauseOnHover={false} />
    <RouterProvider router={router} />
  </>
);
