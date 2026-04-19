import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <form onSubmit={handleLogin} style={styles.formContainer}>
          {/* Proper Nested Flexbox Structure for Title */}
          <div style={styles.titleWrapper}>
            <h1 style={styles.titleText}>Smart Travel</h1>
            <h1 style={styles.titleText}>Planner</h1>
          </div>
          <p style={styles.subtitle}>Login to continue your trip planning</p>
          
          <input
            style={styles.input}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={styles.button} type="submit">
            Login
          </button>
          <p style={styles.text}>
            Don’t have an account?{" "}
            <Link to="/signup" style={styles.link}>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Fixed CSS Styles with proper architecture
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a", // Dark background
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#ffffff", // White Card
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px", // Spacing between nested inputs
  },
  // --- Fixed Overlapping Title Section ---
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0", // Prevent gaps between words
    marginBottom: "5px",
  },
  titleText: {
    margin: 0,
    color: "#0f172a",
    fontSize: "32px",
    fontWeight: "bold",
    lineHeight: "1.1", // Control line height carefully
  },
  // ----------------------------------------
  subtitle: {
    margin: 0,
    textAlign: "center",
    color: "#475569",
    marginBottom: "10px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    width: "100%", // Maintain proper layout flow
    boxSizing: "border-box", // Ensure correct input width calculations
  },
  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.2s", // Guidance recommendation ✅
  },
  text: {
    textAlign: "center",
    color: "#334155",
    margin: 0,
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;