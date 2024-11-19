import { createContext, useState } from "react";

export const cartContext = createContext();
export const CartProvider = cartContext.Provider;

const CartContext = ({ children }) => {
  const [addCart, setAddCart] = useState("");
  return <CartProvider value={{}}>{children}</CartProvider>;
};

export default CartContext;
