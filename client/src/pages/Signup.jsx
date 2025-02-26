import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("🔹 Sending Signup Request:", email, password);

      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });

      console.log("✅ Signup Response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
        window.location.reload(); // ✅ Ensures Navbar updates
      } else {
        alert("Signup failed! No token received.");
      }
    } catch (error) {
      console.error("❌ Signup Error:", error.response ? error.response.data : error);
      alert("Signup failed! " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <form onSubmit={handleSignup}>
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
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
