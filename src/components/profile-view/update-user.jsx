// src/components/update-user/update-user.jsx
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const UpdateUser = ({ user, handleUpdate }) => {
  const [username, setUsername] = useState(user.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email || "");
  const [birthday, setBirthday] = useState(user.Birthday ? user.Birthday.split('T')[0] : "");

  useEffect(() => {
    setUsername(user.Username || "");
    setEmail(user.Email || "");
    setBirthday(user.Birthday ? user.Birthday.split('T')[0] : "");
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
        username: username,
        email: email,
        password: password,
        birthday: birthday
    };

    console.log('User data being sent:', userData); // Log the payload

    try {
        const response = await axios.put(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.username}`, userData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            toast.success("Profile updated successfully!");
            setUser(response.data);
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please check your input.");
    }
};

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

UpdateUser.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }).isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default UpdateUser;