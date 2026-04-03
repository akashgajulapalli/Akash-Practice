import { useRef, useState } from "react";

const CountDownTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const intervalRef = useRef(null);

  // derive time
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // format function
  const format = (num) => String(num).padStart(2, "0");

  // handle input change
  const handleChange = (type, value) => {
    value = value.replace(/\D/g, "").slice(0, 2);

    const h = type === "h" ? Number(value) : hours;
    const m = type === "m" ? Number(value) : minutes;
    const s = type === "s" ? Number(value) : seconds;

    const total = h * 3600 + m * 60 + s;
    setTotalSeconds(total);
  };

  // start / pause
  const startPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
      return;
    }

    if (totalSeconds <= 0) return;

    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIsRunning(true);
  };

  // reset
  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setTotalSeconds(0);
  };

  return (
    <section className="count-down-main-4-1">
      <div className="count-div">
        <h1>Count Down Timer</h1>

        <div className="timer-container">
          <div className="timer-count">
            {/* HOURS */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="HH"
              className="container-inputs-time"
              value={activeInput === "h" ? hours : format(hours)}
              disabled={isRunning}
              onFocus={() => setActiveInput("h")}
              onBlur={() => setActiveInput(null)}
              onChange={(e) => handleChange("h", e.target.value)}
            />

            {/* MINUTES */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM"
              className="container-inputs-time"
              value={activeInput === "m" ? minutes : format(minutes)}
              disabled={isRunning}
              onFocus={() => setActiveInput("m")}
              onBlur={() => setActiveInput(null)}
              onChange={(e) => handleChange("m", e.target.value)}
            />

            {/* SECONDS */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="SS"
              className="container-inputs-time"
              value={activeInput === "s" ? seconds : format(seconds)}
              disabled={isRunning}
              onFocus={() => setActiveInput("s")}
              onBlur={() => setActiveInput(null)}
              onChange={(e) => handleChange("s", e.target.value)}
            />
          </div>

          <div className="button-container">
            <button onClick={startPause}>
              {isRunning ? "Pause" : "Start"}
            </button>

            <button onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountDownTimer;