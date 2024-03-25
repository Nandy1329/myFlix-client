import React from 'react';
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SignupView = ({ token }) => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [email, setEmail] = useState ("");
        const [birthday, setBirthday] = useState("");
    
        const handleSubmit = (event) => {
                event.preventDefault(event);

                const data ={
                        Username: username,
                        Password: password,
                        Email: email,
                        Birthday: birthday
                };

                fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {"Content-Type": "application/json"}
                })
                .then((response) => {
                        if(response.ok) {
                                alert ("Signup Successful");
                                window.location.reload();
                        } else {
                                alert("Signup failed, try again");
                        }
                })
                .catch((error) => {
                        console.error('Error:', error);
                        alert("An error occurred, please try again later.");
                });
        };

        return (
                <Form onSubmit={handleSubmit}>
                    <h1>Create an account</h1>
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
            
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
            
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
            
                    <Button variant="primary" type="submit">Sign up</Button>
                </Form>
        );
};
