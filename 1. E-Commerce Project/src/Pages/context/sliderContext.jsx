import { createContext, useState } from "react";
import "/src/index.css";
export const sliderContext = createContext(null);
export const SliderProvider = sliderContext.Provider;

const SliderContext = ({ children }) => {
  const [image, setImage] = useState([]);

  return (
    <SliderProvider value={{ image, setImage }}>{children}</SliderProvider>
  );
};

export default SliderContext;
