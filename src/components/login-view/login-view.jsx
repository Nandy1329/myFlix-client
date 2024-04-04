import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      Username: username,
      Password: password
    };
  
    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    });
  };
  
  
  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required
            minLength="5"
            />
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             />
        </Form.Group>
        <Button type="submit" className="mt-2">Submit</Button>
    </Form>
);
};