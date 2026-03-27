import { useEffect, useState } from "react";

function Debounce() {
  const [name, setName] = useState();
  useEffect(() => {}, []);

  const handleOnClick = () => {
    console.log("Clicked");
  };

  const debounce = (fn) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      console.log("Timer Reset");
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, 1000);
    };
  };
  const handleSearch = (value) => {
    console.log("SearchAPI called", value);
  };

  const optimizedFn = debounce(handleOnClick);
  const optimizedSearch = debounce(handleSearch);

  return (
    <section>
      <div className="App">
        <h1>Debounce Page</h1>

        <button onClick={() => optimizedFn()}> Click me</button>

        <input
          type="text"
          onChange={(e) => {
            // setName(e.target.value);
            optimizedSearch(e.target.value);
          }}
        />
      </div>
    </section>
  );
}

export default Debounce;
