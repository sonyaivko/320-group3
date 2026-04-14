import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import logo from '../imgs/logo.png';
import stu from '../imgs/signup.webp';
=======
import logo from '../logo.png';
import stu from '../signup.webp';
import { signUp } from "../api/auth";
>>>>>>> 0e1d1ebc196056b8b2066fd51a8dcc5a146272b0

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const data = await signUp(email, password);
      console.log("Signup success:", data);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div
      className="signup-page"
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
        <h2>Sign Up</h2>
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
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-small">Sign Up</button>
        </form>
        <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          <span>Already have an account? </span>
          <button
            className="btn-accent"
            style={{ padding: "6px 12px", fontSize: "0.85rem" }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;