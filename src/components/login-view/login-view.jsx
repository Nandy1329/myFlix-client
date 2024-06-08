import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/login?Username=' +
            username +
            '&Password=' +
            password, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            .then((response) => response.json())
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
                console.error("Error occurred during login", error);
                if (error.response) {
                    console.error("Server responded with.", error.response.data);
                }
                alert("Something went wrong");
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
        />
      </Form.Group>
      <Button variant="primary" type="Submit" className="loginButton">
        Submit
      </Button>
    </Form>
  );
};