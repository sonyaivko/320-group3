import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Example functions for buttons
  const handleLogin = () => {
    console.log("Login clicked");
    navigate("/login");
  };

  const handleSignup = () => {
    console.log("Signup clicked");
    navigate("/signup");
  };

  const handleCreateReport = () => {
    console.log("Create Report clicked");
    navigate("/createreport");
  };

  const handleSearch = () => {
    console.log("Search clicked");
    navigate("/search");
  };

  const handleViewReports = () => {
    console.log("View Reports clicked");
    navigate("/viewreports");
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>UFound: UMass Lost & Found App</h1>
        <p>Report or find lost items quickly and easily.</p>
      </header>

      <div className="home-buttons">
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
        <button className="btn-accent" onClick={handleSignup}>
          Signup
        </button>
        <button className="btn-accent" onClick={handleCreateReport}>
          Create Report
        </button>
        <button className="btn-accent" onClick={handleSearch}>
          Search
        </button>
      </div>

      <h2>View Reports</h2>
      <button className="btn-accent" onClick={handleViewReports}>
        Reports
      </button>

      <footer className="home-footer">
        <p>© 2026 Lost & Found App</p>
      </footer>
    </div>
  );
};

export default Home;