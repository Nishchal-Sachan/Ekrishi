import "./register.scss";
import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password,
      });
      // Check if the response has data
      if (res.status === 201) {
        console.log("User created successfully:");
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response.data.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <span className="error">{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default Register;
