import "./styles.css";
import Home from "./pages/home";
import Polyfill from "./pages/polyfill";
import Searches from "./pages/searches";
import Debounce from "./pages/debounce";
import Throttling from "./pages/throttling";
import EmployeeDB from "./pages/employee-db-management";

export default function App() {
  // return <Home />;
  // return <Polyfill />;
  // return <Searches />;
  // return <Debounce />;
  // return <Throttling />;
  return <div className="App"><EmployeeDB /></div>;
}
