import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <header className="home-header">
      <h1>UFound: UMass Lost & Found App</h1>
      <p>Report or find lost items quickly and easily.</p>
      </header>

      <div className="home-buttons">
      <Link to="/login">
        <button className="btn">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn-accent">Signup</button>
      </Link>
      </div>

      <h2>View Reports</h2>
      <Link to="/viewreports">
        <button className="btn-accent">Reports</button>
      </Link>

      <footer className="home-footer">
        <p>© 2026 Lost & Found App</p>
      </footer>
      
    </div>
  );
};

export default Home;