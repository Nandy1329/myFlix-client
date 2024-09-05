import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileView = ({ user, movies, removeFav, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [password, setPassword] = useState("");

  const handleUpdate = (event) => {
    event.preventDefault();

    let token = localStorage.getItem("token");
    const url = `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}`;

    axios
      .put(
        url,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      });
  };

  return (
    <Row>
      <Col xs={12} md={6}>
        <Card>
          <Card.Body>
            <UserInfo email={user.Email} name={user.Username} birthday={user.Birthday} />
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <FavoriteMovies user={user} movies={movies} removeFav={removeFav} />
      </Col>
      <Col xs={12} md={6}>
        <Card>
          <Card.Body>
            <h3>Update Profile</h3>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  removeFav: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default ProfileView;