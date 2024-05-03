import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birth_date, setBirth_date] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birth_Date: birth_date
    };

    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users', {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.ok) {
        alert("Signup Successful");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
        window.location.reload();
      } else {
        alert("Signup failed, try again");
      }
    })
  };

  return (
    <Form onSubmit={handleSubmit}>
      <br />
      <h1> Create an account </h1>
      <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        minLength={5}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      </Form.Group>
      <br />
      <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </Form.Group>
      <br />
      <Form.Group controlId="formEmail">
      <Form.Label> Email: </Form.Label>
      <Form.Control
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      </Form.Group>
      <br />
      <Form.Group controlId="formBirthDate">
      <Form.Label> Birthday: </Form.Label>
      <Form.Control
        type="date"
        value={birthday}
        onChange={(e) => setBirth_date(e.target.value)}
        required
      />
      </Form.Group>
      <br />
      
      <Button variant="primary" type="submit"> Sign up </Button>
    </Form>
  );
}