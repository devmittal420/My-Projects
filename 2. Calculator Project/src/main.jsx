import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import CalculatorStore from "./calculatorStore.js"
import Calculator from "./Features/calculator.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={CalculatorStore}>
    <Calculator />
  </Provider>
);
