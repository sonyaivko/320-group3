import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ViewReports from "./pages/ViewReports";
import CreateReport from "./pages/CreateReport";
import Search from "./pages/Search";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/viewreports" element={<ViewReports />} />
        <Route path="/createreport" element={<CreateReport />} />
        <Route path="/search" element={<Search />} /> 
      </Routes>
    </Router>
  );
}