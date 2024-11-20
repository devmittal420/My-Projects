import { configureStore } from "@reduxjs/toolkit";
import CalculatorSlice from "./Features/calculatorslice"

const CalculatorStore = configureStore({
  reducer: {
    calculator: CalculatorSlice,
  },
});

export default CalculatorStore;
