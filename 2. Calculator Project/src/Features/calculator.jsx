import "/src/index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  inputValue,
  setOperator,
  calculateResult,
  clearDisplay,
  backspace,
} from "./calculatorslice.js";

const Calculator = () => {
  const [showCover, setShowCover] = useState(true);
  const calculateState = useSelector((state) => state.calculator);
  const dispatch = useDispatch();

  useEffect(() => {
    const onHandleKey = (e) => {
      const { key } = e;
      if (!isNaN(key)) {
        dispatch(inputValue(key));
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        dispatch(setOperator(key));
      } else if (key === "=" || key === "Enter") {
        dispatch(calculateResult(key));
      } else if (key === "c" || key === "Escape") {
        dispatch(clearDisplay(key));
      } else if (key === "Backspace") {
        dispatch(backspace());
      } else if (key === "o") {
        setShowCover((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onHandleKey);
    return () => window.removeEventListener("keydown", onHandleKey);
  }, [dispatch]);

  const onHandleNumber = (num) => {
    dispatch(inputValue(num));
  };
  const onHandleOperator = (operator) => {
    dispatch(setOperator(operator));
  };
  const onHandleEqual = () => {
    dispatch(calculateResult());
  };
  const onHandleClear = () => {
    dispatch(clearDisplay());
  };
  const onHandleBackspace = () => {
    dispatch(backspace());
  };
  const toggleCover = () => {
    setShowCover((prev) => !prev);
  };

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center fixed left-0 right-0 ">
      <div
        className={`relative w-[500px] h-[500px] max-w-sm p-6 rounded-3xl shadow-md bg-slate-400`}
      >
        {/* Sliding Cover */}
        <div
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out rounded-3xl ${
            showCover
              ? "transform -translate-y-0"
              : "transform -translate-x-[370px]"
          }`}
          style={{
            zIndex: 10,
            backgroundImage:
              'URL("https://i.postimg.cc/44hSqfYk/IMG-20241111-190333.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {showCover && (
            <button
              className="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 duration-200 text-white p-2 rounded-3xl"
              onClick={toggleCover}
            >
              {showCover ? "Open Calculator" : "Close Calculator"}
            </button>
          )}
        </div>

        {!showCover && (
          <button
            className="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 duration-200 text-white p-2 rounded-3xl"
            onClick={toggleCover}
          >
            {showCover ? "Open Calculator" : "Close Calculator"}
          </button>
        )}

        {/* Calculator Content */}
        <div>
          <h1 className="font-bold p-5 -mt-3 text-white">My Calculator</h1>
          <div className="text-right p-4 rounded mb-3 bg-white">
            <p>{calculateState.inputStr || 0}</p>
            <p className="h-3 font-thin">{calculateState.result}</p>
          </div>

          <div className="grid grid-cols-4 gap-2 ">
            <button
              className=" p-2 bg-red-500 rounded text-white hover:bg-red-700 duration-300"
              onClick={onHandleClear}
            >
              AC
            </button>

            <button
              className="p-2 bg-gray-300 rounded hover:text-white hover:bg-gray-400 duration-300"
              onClick={() => onHandleOperator("%")}
            >
              %
            </button>
            <button
              className="p-2 bg-gray-300 rounded hover:text-white hover:bg-gray-400 duration-300"
              onClick={onHandleBackspace}
            >
              Del
            </button>
            <button
              className="p-2 bg-gray-300 rounded hover:text-white hover:bg-gray-400 duration-300"
              onClick={() => onHandleOperator("/")}
            >
              /
            </button>

            {/* Number and operator buttons */}
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber(7)}
            >
              7
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber(8)}
            >
              8
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber(9)}
            >
              9
            </button>
            <button
              className="p-2 bg-gray-300 rounded hover:text-white hover:bg-gray-400 duration-300"
              onClick={() => onHandleOperator("*")}
            >
              *
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber(4)}
            >
              4
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber(5)}
            >
              5
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber(6)}
            >
              6
            </button>
            <button
              className="p-2 bg-gray-300 rounded hover:text-white hover:bg-gray-400 duration-300"
              onClick={() => onHandleOperator("-")}
            >
              -
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber(1)}
            >
              1
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber(2)}
            >
              2
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber(3)}
            >
              3
            </button>
            <button
              className="p-2 bg-gray-300 rounded hover:text-white hover:bg-gray-400 duration-300"
              onClick={() => onHandleOperator("+")}
            >
              +
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber("00")}
            >
              00
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber("0")}
            >
              0
            </button>
            <button
              className="p-2 bg-white rounded hover:text-white hover:bg-gray-200 duration-300"
              onClick={() => onHandleNumber(".")}
            >
              .
            </button>
            <button
              className="p-2 bg-gray-300 rounded hover:text-white hover:bg-gray-400 duration-300"
              onClick={onHandleEqual}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
