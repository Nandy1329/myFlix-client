import React, { useState, useEffect } from "react";
import { FormGroup, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";


export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    useEffect(() => {
        setUsername("");
        setPassword("");
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
    
        fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Username: username, Password: password}),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user);
                } else {
                    alert("No such user");
                }
            })
            .catch((error) => {
                console.error("Error occurred during login", error);
                alert("Something went wrong");
            });
    };

    return (
        <Form onSubmit={handleSubmit} className="userLogin">
            <FormGroup controlId="formUsername" className="inputGroup">
                <div>
                    <h1 className="userLogin">User Login</h1>
                </div>
                <Form.Label>Username:</Form.Label>
                <Form.Control className="loginForm"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="off"
                />
            </FormGroup>

            <FormGroup controlId="formPassword" className="inputGroup">
                <Form.Label>Password:</Form.Label>
                <Form.Control className="loginForm"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                />
            </FormGroup>
            <Button variant="primary" type="submit" className="loginButton">Submit</Button>
        </Form>
    );
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
};
};














