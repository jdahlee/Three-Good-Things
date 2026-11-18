import { useState } from "react";
import { loginUser } from "../services/requests";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { loginWithGoogle } from "../services/requests";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleSubmit = async () => {
    const result = await loginUser(username, password);
    console.log("Submitted username", username);
    console.log("Submitted password", password);
    setUsername("");
    setPassword("");
    if (result.error) {
      alert(`${result.error}`);
    } else if (result && result.message == "Login successful") {
      // refresh user state after succesful login, updates components
      await refreshUser();
      navigate("/");
    }
  };

  // login with Google option
  const googleLogin = async () => {
    try {
      // sign in with Google popup
      const result = await signInWithPopup(auth, provider);
      // get ID token from Google user
      const idToken = await result.user.getIdToken();
      // sends ID token to backend
      const response = await loginWithGoogle(idToken);
      if (response.error) {
        alert(`${response.error}`);
        return;
      }
      // refresh user state after succesful login, updates components
      await refreshUser();
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
  };

  const headingStyle = {
    marginBottom: "20px", // Add space below the heading
    color: "white",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "8px",
    width: "200px",
    color: "white",
  };

  const buttonStyle = {
    padding: "8px 16px",
    margin: "5px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Login </h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <button style={buttonStyle} onClick={handleSubmit}>
        Login
      </button>
      <button style={buttonStyle} onClick={googleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
