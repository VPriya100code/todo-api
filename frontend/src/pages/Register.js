import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    await API.post("/api/auth/register", { email, password });
    alert("Registered successfully");
    navigate("/");
  } catch (err) {
    alert(err.response?.data?.message || "Register failed");
  }
};

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Register</h2>

        <input
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

        <button type="submit">Register</button>

        <p>
          Already registered? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
