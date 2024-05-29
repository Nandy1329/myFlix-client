import React, { useState } from "react";
import { FormGroup, Form, Button } from "react-bootstrap";


export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username.length < 5) {
            alert("Username must be at least 5 characters long");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Invalid email address");
            return;
        }

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="signUpForm">
            <div className="newUserDiv">
                <h1 className="newUserSignup">User Signup</h1>
            </div>
            <FormGroup controlId="formUsername" className="userNameGroup">
                <Form.Label>Username</Form.Label>
                <Form.Control className="inputUser"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} required
                    minLength="3"
                />
            </FormGroup>

            <FormGroup controlId="formPassword" className="userNameGroup">
                <Form.Label>Password</Form.Label>
                <Form.Control className="inputUser"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </FormGroup>

            <FormGroup controlId="formEmail" className="userNameGroup">
                <Form.Label>Email</Form.Label>
                <Form.Control className="inputUser"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </FormGroup>

            <FormGroup controlId="formBirthday" className="userNameGroup">
                <Form.Label>Birthday</Form.Label>
                <Form.Control className="inputUser"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required />
            </FormGroup>
            <Button type="submit" className="signUpButton">Submit</Button>
        </Form>
    );
};
