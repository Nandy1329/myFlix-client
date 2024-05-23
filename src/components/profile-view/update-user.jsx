import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

export const UpdateUser = ({ formData, handleUpdate, handleSubmit }) => {

  return (
    <Row>
      <Form onSubmit={handleSubmit}>
      <br />
      <h1>Update Profile</h1>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="username"
          onChange={handleUpdate}
          required
        />
        <br />
    </Form.Group>
    <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        placeholder="password"
        onChange={handleUpdate}
        required
      />
      <br />
    </Form.Group>
    <Form.Group controlId="formEmail">
      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="email"
        placeholder="email"
        onChange={handleUpdate}
        required
      />
      <br />
    </Form.Group>
    <Form.Group controlId="formBirthday">
      <Form.Label>Birthday:</Form.Label>
      <Form.Control
        type="date"
        onChange={handleUpdate}
        required
      />
      <br />
    </Form.Group>
    <Button variant="primary" type="submit">
      Update
    </Button>
    <Button variant="secondary" onClick={handleSubmit}>
      Cancel
    </Button>
  </Form>
    <br />
    </Row>
  );
}
UpdateUser.propTypes = {
  formData: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.string,
  }).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};