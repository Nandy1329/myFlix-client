import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, Card } from 'react-bootstrap';


export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

       // Perform validation checks before submitting the form
       if (UserName.length < 5) {
        alert("Username must be at least 5 characters long");
        return;
      }
  
      if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }
  
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email address");
        return;
      }

    const formData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.ok) {
        alert("Signup Successful");
        // Update state or perform any other action after successful signup
      } else {
        alert("Signup failed, try again");
      }
    }).catch((error) => {
      alert("An error occurred, please try again");
    });
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Sign Up</Card.Title>
            <Card.Text>
              Please fill in the form below to sign up.
            </Card.Text>
            {signupForm}
          </Card.Body>
        </Card>
      </Col>

      <Col>
        <Card>
          <Card.Body>
            <Card.Text>
              Already have an account? <Link to={`/`}>Login here</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  
  );
}
