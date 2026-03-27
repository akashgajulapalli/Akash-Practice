import { useEffect } from "react";

function Polyfill({ data }) {
  let arr = [1, 2, 3, 4, 5];

  useEffect(() => {
    Array.prototype.myforEach = function (callB) {
      for (let val of this) {
        callB(val);
      }
    };

    arr.myforEach((item) => console.log(item * 2));
  }, []);

  return (
    <section>
      <div className="App">
        <h1>Polyfill Pages</h1>
      </div>
    </section>
  );
}

export default Polyfill;
