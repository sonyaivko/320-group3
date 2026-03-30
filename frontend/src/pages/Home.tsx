import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1 style={{ color: "black" }}>Welcome to Lost & Found App</h1>
      <Link to="/login">
        <button className="btn">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn">Signup</button>
      </Link>
      <Link to="/todos">
        <button className="btn">Todos Page</button>
      </Link>
    </div>
  );
};

export default Home;