
import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export const ProfileView = ({ user }) => {
    var userInfo = user;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birth_date, setBirth_date] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birth_Date: birth_date
        };
    
    fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}).then((response) => {
    if (response.ok) {
        alert('Update successful.');
        window.location.reload();
    } else {
        alert('Update failed.');
    }
});
};


return (
  <>
      <Col>
          <div>
              <span>Username: </span>
              <span>{userInfo.username}</span>
          </div>
          <div>
              <span>Password: </span>
              <span>********</span>
          </div>
          <div>
              <span>Email: </span>
              <span>{userInfo.email}</span>
          </div>
          <div>
              <span>Birthday: </span>
              <span>{userInfo.birth_date}</span>
          </div>
          <div>
              <span>Favorite Movies: </span>
              <span>{userInfo.favorite_movies}</span>
          </div>
      </Col>
      <Col>
          <Form onSubmit={handleSubmit}>
              <Form.Group>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength='5'
                  />
              </Form.Group>

              <Form.Group>
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </Form.Group>

              <Form.Group>
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
              </Form.Group>

              <Form.Group>
                  <Form.Label>Birthday: </Form.Label>
                  <Form.Control
                      type='date'
                      value={birth_date}
                      onChange={(e) => setBirth_date(e.target.value)}
                      required
                  />
              </Form.Group>

              <Button variant='primary' type='submit'>
                  Submit
              </Button>
          </Form>
      </Col>
  </>
)
}
