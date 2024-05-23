import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

export class UpdateUser extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
    };
  }

  handleUpdate(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    const { user, onBackClick } = this.props;

    return (
      <div className="update-user">
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              onChange={(e) => this.setState({ Username: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              onChange={(e) => this.setState({ Password: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              onChange={(e) => this.setState({ Email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => this.setState({ Birthday: e.target.value })}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={(e) => this.handleUpdate(e)}>
            Update
          </Button>
          <Button variant="secondary" onClick={() => onBackClick(null)}>
            Back
          </Button>
        </Form>
      </div>
    );
  }
}