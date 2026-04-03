import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../logo.png';
import stu from '../stu.webp';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${stu})`,
      }}
    >
      <header className="home-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-text">
            <h1>UFound: UMass Lost & Found App</h1>
            <p>Report or find lost items quickly and easily.</p>
          </div>
          <div className="top-right-buttons">
            <button className="btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn-accent" onClick={() => navigate("/signup")}>
              Signup
            </button>
          </div>
        </div>
      </header>

      <div className="glass-box">
        <button className="btn-accent" onClick={() => navigate("/createreport")}>
          Create Report
        </button>
        <button className="btn-accent" onClick={() => navigate("/viewreports")}>
          View Reports
        </button>
      </div>

      <footer className="home-footer">
        <p>© 2026 Lost & Found App</p>
      </footer>
    </div>
  );
};

export default Home;