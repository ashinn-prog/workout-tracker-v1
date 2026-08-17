import React, { useState } from "react";
import API_BASE_URL from "../api";

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setFormData({ username: "", password: "" });
        
        // Wait 1.5 seconds so user can see success message before switching view
        setTimeout(() => {
          if (onRegisterSuccess) onRegisterSuccess();
        }, 1500);
      } else {
        setError(data.error || data.detail || "Registration failed.");
      }
    } catch (err) {
      setError("Error connecting to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          style={{ marginTop: "15px", padding: "8px 16px" }}
        >
          {loading ? "Registering (Waking server...)" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;