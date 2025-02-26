import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("🔹 Sending Login Request:", email, password);
  
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      console.log("✅ Login Response:", response.data);
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token properly
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`; // Set global token for axios
        window.location.href = "/"; // Refresh page to update state
      } else {
        alert("Login failed! No token received.");
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response ? error.response.data : error);
      alert("Login failed! " + (error.response?.data?.error || "Unknown error"));
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
