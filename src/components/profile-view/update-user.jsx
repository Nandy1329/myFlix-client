import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UpdateUser({ handleSubmit, handleUpdate }) {

  return (
    <Form>

      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          defaultValue={user.Username}
          onChange={e => handleUpdate(e)}
          required
          placeholder='Enter Username'
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          defaultValue={user.Password}
          onChange={e => handleUpdate(e)}
          required
          placeholder='Enter Password'
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          defaultValue={user.Email}
          onChange={e => handleUpdate(e)}
          required
          placeholder='Enter Email'
        />
      </Form.Group>

      <Button variant='primary' type='submit' onClick={handleSubmit}>
        Update
      </Button>
    </Form>
  );
}
export default UpdateUser;