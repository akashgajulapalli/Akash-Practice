import { useEffect } from "react";

function Searches() {
  let myArray = [1, 2, 3, 4, 5, 15, 73, 11, 12, 43, 23, 64, 34];
  let myTarget = 5;

  useEffect(() => {
    // Binary Search( We need Sorted array )
    let tempArr = myArray.sort((a, b) => a - b);

    let binarySearch = function (arr, target) {
      let first = 0;
      let last = arr.length - 1;
      while (first <= last) {
        let mid = Math.floor((first + last) / 2);
        if (arr[mid] === target) {
          return mid;
        }
        if (arr[mid] < target) {
          first = mid + 1;
        } else {
          last = mid - 1;
        }
      }
      return -1;
    };

    console.log(binarySearch(tempArr, myTarget));
  }, []);

  return (
    <section>
      <div className="App">
        <h1>Sarches Page</h1>
      </div>
    </section>
  );
}

export default Searches;
