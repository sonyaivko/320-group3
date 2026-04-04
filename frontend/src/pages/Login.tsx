import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../logo.png';
import stu from '../signin.webp';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
    // TODO: connect to backend / Supabase auth
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${stu})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="glass-box">
        <img src={logo} alt="Logo" className="logo" style={{ width: '100px', marginBottom: '20px' }} />
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '250px' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-small">Login</button>
        </form>
        <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          <span>Don't have an account? </span>
          <button
            className="btn-accent"
            style={{ padding: "6px 12px", fontSize: "0.85rem" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;