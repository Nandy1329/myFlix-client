import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Username: username, Password: password }),
    })
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid username or password');
          }
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error occurred during login", error);
        alert(error.message || "Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="userLogin">
      <Form.Group controlId="formUsername" className="inputGroup">
        <div>
          <h1 className="userLogin">User Login</h1>
        </div>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          className="loginForm"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="off"
          disabled={loading}
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="inputGroup">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          className="loginForm"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="off"
          disabled={loading}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="loginButton" disabled={loading}>
        {loading ? 'Logging in...' : 'Submit'}
      </Button>
    </Form>
  );
};
