import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import Calculator from "./assets/Features/calculator.jsx";
import calculatorStore from "./calculatorStore.js";

createRoot(document.getElementById("root")).render(
  <Provider store={calculatorStore}>
    <Calculator />
  </Provider>
);
