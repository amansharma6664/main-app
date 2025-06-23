// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS = {
  admin: { password: "admin123", role: "admin" },
  user: { password: "user123", role: "user" }
};
 
const Login = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (USERS[username] && USERS[username].password === password) {
      const userData = {
        username,
        role: USERS[username].role
      };
      localStorage.setItem("auth", JSON.stringify(userData));
      setAuth(userData);
      navigate("/"); // or your dashboard route
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>Login</button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  heading: { fontSize: "24px", marginBottom: "20px" },
  input: {
    width: "250px",
    padding: "10px",
    margin: "10px 0",
    fontSize: "16px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    marginTop: "10px"
  }
};

export default Login;
