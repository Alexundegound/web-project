import "./App.scss";
import { RegisterCheck } from "./pages/RegisterCheck/RegisterCheck.jsx";
import { ListCheck } from "./pages/ListCheck/ListCheck.jsx";
import { ChartCheck } from "./pages/ChartCheck/ChartCheck.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<RegisterCheck />} />
          <Route path="/list" element={<ListCheck />} />
            <Route path="/chart" element={<ChartCheck />} />
        </Routes>
      </div>
    </div>
  );
};
