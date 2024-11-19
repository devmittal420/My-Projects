import React, { createContext, useState, useEffect } from "react";

export const stopwatchContext = createContext(null);
export const StopwatchProvider = stopwatchContext.Provider;

const StopwatchContext = ({ children }) => {
  const [stopwatch, setStopwatch] = useState(0);
  const [runwatch, setRunwatch] = useState(false);

  useEffect(() => {
    let interval;

    if (runwatch) {
      interval = setInterval(() => {
        setStopwatch((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [runwatch]);

  const onstartwatch = () => {
    setRunwatch(true);
  };
  const onStopwatch = () => {
    setRunwatch(false);
  };
  const onResetwatch = () => {
    setStopwatch(0);
    setRunwatch(false);
  };

  const timeFormat = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const milliseconds = time % 100;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const hours = Math.floor(totalSeconds / (60 * 60));

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
  };

  const pad = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <StopwatchProvider
      value={{ timeFormat, stopwatch, onstartwatch, onStopwatch, onResetwatch }}
    >
      {children}
    </StopwatchProvider>
  );
};

export default StopwatchContext;
