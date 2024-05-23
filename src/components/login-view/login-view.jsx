import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    try {
      const response = await fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userLogged = await response.json();

      localStorage.setItem("user", userLogged.user.username);
      localStorage.setItem("token", userLogged.token);
      onLoggedIn(userLogged.user.username, userLogged.token);
    } catch (error) {
      alert('Username or password invalid.');
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <>
      <Form className="form-login" onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            className="form-control-input"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={5}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            className="form-control-input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </Form.Group>
        <Button variant="outline-light" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}