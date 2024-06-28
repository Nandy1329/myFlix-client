import React from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";


export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };
        fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((loginData) => {
                if (loginData.user) {
                    localStorage.setItem("user", JSON.stringify(loginData.user));
                    localStorage.setItem("token", loginData.token);
                    onLoggedIn(loginData.user, loginData.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            })
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-5">
            <Form.Group className="mb-2" controlId="loginFormUsername">
                <Form.Label>
                    Username:
                </Form.Label>
                <Form.Control 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                minLength="5"
                placeholder="Enter username"
                 required />
            </Form.Group>

            <Form.Group className="mb-2" controlId="loginFormPassword">
                <Form.Label>
                    Password:
                </Form.Label>
                <Form.Control 
                type="password" value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                placeholder="Enter password" />
            </Form.Group>

            <Button className="mt-4" type="submit" variant="primary">Submit</Button>

            <div className="mt-3 fst-italic"><Link to={`/signup`} >Don't have an account?</Link></div>
        </Form>
    )
};

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};