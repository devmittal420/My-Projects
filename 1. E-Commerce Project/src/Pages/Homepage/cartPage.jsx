import React, { useContext } from "react";
import { cartContext } from "../context/cartContext";

const CartPage = () => {
  const { cartItems } = useContext(cartContext);

  return (
    <div>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
    </div>
  );
};

export default CartPage;
