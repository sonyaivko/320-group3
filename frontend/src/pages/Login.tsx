import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/toastcontext";
import logo from '../imgs/logo.png';
import { signIn } from "../api/auth";
import stu from '../imgs/stu.webp';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  try {
    const data = await signIn(email, password);

    // ✅ HARD VALIDATION (important)
    if (!data.session?.access_token) {
      throw new Error("Login failed: no session token returned");
    }

    // ✅ STORE TOKEN
    localStorage.setItem("token", data.session.access_token);

    // (optional but recommended)
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("Login success:", data);
    
    showToast("Login successful", "success");

    setTimeout(() => {
      navigate("/");
    }, 800);

    navigate("/");

  } catch (err: any) {
    showToast(err.message, "error");
  }
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