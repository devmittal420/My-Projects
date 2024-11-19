import { createContext, useState, useContext } from "react";

export const mobileContext = createContext(null);
export const MobileProvder = mobileContext.Provider;

const MobileContext = ({ children }) => {
  const [mobile, setMobile] = useState([]);

  return (
    <MobileProvder value={{ mobile, setMobile }}>{children}</MobileProvder>
  );
};

export const mobileTheme = () =>{
    return useContext(mobileContext);
}

export default MobileContext;

