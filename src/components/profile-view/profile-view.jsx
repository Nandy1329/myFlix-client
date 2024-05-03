import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const ProfileView = ({ user }) => {
    const [Username, setUsername] = useState(user ? user.username : '');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState(user ? user.email : '');
    const [Birth_date, setBirth_date] = useState(user ? user.birth_date : '');
    const [error, setError] = useState('');

    const updateUserInfo = (event) => {
        event.preventDefault();

        // Validate form fields
        if (!username || !password || !email || !birth_date) {
            setError('All fields are required.');
            return;
        }

        const data = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birth_Date: Birth_Date
        };

        fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                alert('Update successful.');
                // Update user info state or provide appropriate feedback
            } else {
                setError('Update failed. Please try again.');
            }
        }).then((data) => {
            console.log('user updated:', data);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            onUserUpdate(data.user, data.token);
        });
    };

    return (
        <Col>
            <Row>
                <h3>User Profile</h3>
                <div>
                    <span>Username: </span>
                    <span>{user.Username}</span>
                </div>
                <div>
                    <span>Email: </span>
                    <span>{user.Email}</span>
                </div>
                <div>
                    <span>Date of Birth: </span>
                    <span>{user.Birth_Date}</span>
                </div>
            </Row>
            <Row>
                <h3>Update User Information</h3>
                <Form onSubmit={updateUserInfo}>
                    <Form.Group controlId='formUsername'>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            type='text'
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength='5'
                        />
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            type='password'
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='formEmail'>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control
                            type='email'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='formBirth_date'>
                        <Form.Label>Birthday: </Form.Label>
                        <Form.Control
                            type='date'
                            value={Birth_Date}
                            onChange={(e) => setBirth_date(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </Row>
            <Row>
                <h3>Favorite Movies</h3>
            </Row>
        </Col>
    );
};
