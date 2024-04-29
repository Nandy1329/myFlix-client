import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export const UpdateUser = ({ formData = {}, handleUpdate, handleSubmit }) => {
  const { UserName = '', Password = '', Email = '', Birthday = '' } = formData;

  return (
    <Row>
      <Form onSubmit={handleSubmit}>
        <br />
        <h3>Update profile information</h3>
        <Form.Group controlId="formUsername">
          <Form.Label htmlFor="username">Username:</Form.Label>
          <Form.Control
            type="text"
            id="username"
            minLength={4}
            value={UserName}
            onChange={(e) => handleUpdate({ ...formData, UserName: e.target.value })}
            required
          />
          <br />
        </Form.Group>
        <br />
        <Form.Group controlId="formPassword">
          <Form.Label htmlFor="password">
            Password:
            <p>Your new password must be at least 8 characters long.</p>
          </Form.Label>
          <Form.Control
            type="password"
            id="password"
            minLength={8}
            value={Password}
            onChange={(e) => handleUpdate({ ...formData, Password: e.target.value })}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formEmail">
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Control
            type="email"
            id="email"
            value={Email}
            onChange={(e) => handleUpdate({ ...formData, Email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label htmlFor="birthday">Birthday:</Form.Label>
          <Form.Control
            type="date"
            id="birthday"
            value={Birthday}
            onChange={(e) => handleUpdate({ ...formData, Birthday: e.target.value })}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Submit changes
        </Button>
      </Form>
      <br />
    </Row>
  );
};

UpdateUser.propTypes = {
  formData: PropTypes.object,
  handleUpdate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default UpdateUser;
