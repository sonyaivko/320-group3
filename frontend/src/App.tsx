import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ViewReports from "./pages/ViewReports";
import CreateReport from "./pages/CreateReport";
import ProtectedRoute from "./ProtectedRoute";
import { ToastProvider } from "./context/toastcontext";
import "./App.css";

export default function App() {
  return (
    <ToastProvider>
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED */}
        <Route
          path="/viewreports"
          element={
            <ProtectedRoute>
              <ViewReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createreport"
          element={
            <ProtectedRoute>
              <CreateReport />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </ToastProvider>
  );
}