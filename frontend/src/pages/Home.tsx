import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1 style={{ color: "black" }}>Welcome to Lost and UFound</h1>
      <Link to="/login">
        <button className="btn">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn">Signup</button>
      </Link>

      <h2 style={{color: "black"}}>View Reports</h2>
      <Link to="/viewreports">
        <button className="btn">Reports</button>
      </Link>
    </div>
  );
};

export default Home;