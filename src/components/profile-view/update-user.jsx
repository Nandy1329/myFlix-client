import React from 'react'
import PropTypes from "prop-types"
import Button  from 'react-bootstrap/Button'
import  Form  from 'react-bootstrap/Form'
import Row  from 'react-bootstrap/Row'

export const UpdateUser = ({formData, handleUpdate, handleSubmit }) => {
  
    return (
    <Row>
        <Form onSubmit={handleSubmit}>
        <br />
            <h3>Update profile information</h3>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                type="text"
                minLength={4}
                value={formData.username}
                onChange={(e) => handleUpdate(e)}
                required
                />
                <br />
            </Form.Group>
            <br />
            <Form.Group controlId='formPassword'>
                <Form.Label>Password:
                <p>Your new password must be at least 8 characters long.</p>
                </Form.Label>
                <Form.Control
                type="password"
                minLength={8}
                value={formData.password}
                onChange={(e) => handleUpdate(e)}
                required
                />
            </Form.Group>
            <br />
            <Form.Group controlId='formEmail'>
            <Form.Label> Email: </Form.Label>
            <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => handleUpdate(e)}
                required
            />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                type="date"
                value={formData.birthDate.slice(0, 10)}
                onChange={(e) => handleUpdate(e)}
                required
                />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
          {" "}
          Submit changes{" "}
        </Button> 
        </Form>  
      <br /> 
     </Row>   
  )
}
UpdateUser.propTypes = {
    formData: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };