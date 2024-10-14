import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Capture location info

  const from = location.state?.from?.pathname || "/"; // If no 'from', default to homepage

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      if (res.status === 201) {
        updateUser(res.data); // Update user in context
        navigate(from, { replace: true }); // Redirect to the previous page
      } else {
        setError("login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={loading}>
            {loading ? "Logging you in..." : "Login"}
          </button>
          {error && <span className="error">{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
