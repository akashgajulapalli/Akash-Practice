import { useRef, useCallback } from "react";

function Throttling() {
  const handleOnClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  const throttle = (fun, limit) => {
    let flag = true;

    return function (...args) {
      if (flag) {
        fun.apply(this, args);
        flag = false;

        setTimeout(() => {
          flag = true;
          console.log("Time out");
        }, limit);
      }
    };
  };

  const throttledRef = useRef(null);

  if (!throttledRef.current) {
    throttledRef.current = throttle(handleOnClick, 2000);
  }

  return <button onClick={throttledRef.current}>Click me</button>;
}

export default Throttling;
