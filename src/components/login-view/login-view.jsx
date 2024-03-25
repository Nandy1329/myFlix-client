import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    console.log('handleSubmit called');
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };
    console.log(username, password);

    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Form.Group controlId="FormUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </Form.Group>
      <br />

      <Form.Group controlId="formUsername">
  <Form.Label>Password:</Form.Label>
  <Form.Control
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
</Form.Group>
      <br />
      <Button type="submit">Login</Button>
    </Form>
  );};