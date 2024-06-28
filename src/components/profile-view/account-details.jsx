import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const AccountDetails = ({ user, onAccountUpdate }) => {
  const [id] = useState(user._id);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const token = localStorage.getItem('token');

  const profileFormData = {
    id: id,
    Username: username,
    Email: email,
    Birthday: birthday,
    Password: password
  };

  const handleUpdate = (e) => {
    switch (e.target.type) {
      case "text":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "date":
        setBirthday(e.target.value.slice(0, 10));
      default:
    }
  }

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(profileFormData)
    }).then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          onAccountUpdate(updatedUser);
          alert("Account updated successfully.");
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      })
  };

  const handleDeleteAccount = () => {
    fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-5">
      <Form.Group className="mb-2" controlId="profileFormUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" minLength="8" value={profileFormData.Username} onChange={(e) => handleUpdate(e)} required />
      </Form.Group>
      <Form.Group className="mb-2" controlId="profileFormPassword">
        <Form.Label>Password:
        </Form.Label>
        <Form.Control type="password" minLength="10" value={profileFormData.Password} onChange={(e) => handleUpdate(e)} required />
      </Form.Group >
      <Form.Group className="mb-2" controlId="profileFormEmail">
        <Form.Label> Email: </Form.Label>
        <Form.Control type="email" value={profileFormData.Email} onChange={(e) => handleUpdate(e)} required />
      </Form.Group>
      <Form.Group className="mb-2" controlId="profileFormBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" value={profileFormData.Birthday} onChange={(e) => handleUpdate(e)} required />
      </Form.Group>
      <Row className="my-4">
        <Col>
          <Button variant="primary" type="submit">Update</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button type="button" onClick={() => handleDeleteAccount()} variant="outline-secondary"> Delete account permanently</Button>
        </Col>
      </Row>
    </Form>
  )
}
AccountDetails.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onAccountUpdate: PropTypes.func.isRequired
};