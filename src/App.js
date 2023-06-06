import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CountryDetail from "./components/CountryDetail/CountryDetail";
import CreateActivity from "./components/CreateActivity/CreateActivity";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activity" element={<CreateActivity />} />
        <Route path="/countries/:id" element={<CountryDetail />} />
      </Routes>
    </>
  );
}

export default App;
