import { useContext } from "react";
import { stopwatchContext } from "../Context/stopwatchContext";

const StopwatchHomepage = () => {
  const { timeFormat, stopwatch, onstartwatch, onStopwatch, onResetwatch } =
    useContext(stopwatchContext);

  return (
    <div className="grid justify-center items-center h-screen bg-gray-600">
      <div className=" grid bg-white p-8 rounded-full h-[500px] w-[500px] text-center">
        <h1 className="text-5xl font-bold mt-6">Stopwatch</h1>
        <h2 className="text-6xl font-mono">{timeFormat(stopwatch)}</h2>

        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={onstartwatch}
            className="bg-green-500 text-white h-[60px] w-[100px] rounded-xl hover:bg-green-600 transition duration-300"
          >
            Start
          </button>
          <button
            onClick={onStopwatch}
            className="bg-red-500 text-white h-[60px] w-[100px] rounded-xl hover:bg-red-600 transition duration-300"
          >
            Stop
          </button>
          <button
            onClick={onResetwatch}
            className="bg-gray-500 text-white h-[60px] w-[100px] rounded-xl hover:bg-gray-600 transition duration-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StopwatchHomepage;
