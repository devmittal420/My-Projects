import { configureStore } from "@reduxjs/toolkit";
import CalculatorSlice from "./assets/Features/calculatorslice"

const calculatorStore = configureStore({
  reducer: {
    calculator: CalculatorSlice,
  },
});

export default calculatorStore;
