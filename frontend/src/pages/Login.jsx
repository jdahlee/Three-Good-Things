import  { useState } from 'react';
import { loginUser } from '../services/requests';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const result = await loginUser(username, password);
    console.log("Submitted username", username);
    console.log("Submitted password", password);
    setUsername("");
    setPassword("");
    if (result.error) {
      alert(`${result.error}`);
    } else if (result && result.message == "Login successful") {
      navigate("/");
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headingStyle = {
    marginBottom: '20px', // Add space below the heading
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    width: '200px',
  };

  const buttonStyle = {
    padding: '8px 16px',
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
        <button style={buttonStyle}
         onClick={handleSubmit}>
          Login
        </button>
    </div>
  );
};

export default Login;