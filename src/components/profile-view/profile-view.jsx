import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FavoriteMovies } from './favorite-movies';

export const ProfileView = ({ user, token }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birth_date, setBirth_date] = useState('');

    const updateUserInfo = (event) => {
        event.preventDefault();

        // Validate form fields
        if (!username || !password || !email || !birth_date) {
            setError('All fields are required.');
            return;
        }

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birth_Date: birth_date
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
                alert('User update successful.');
                console.log('User updated: ', data);
                window.location.reload();
            } else {
                alert('User update failed.');
            }
        });
    };

    return (
        <Col>
            <Row>  {/* Display user information */}
                <h3>User Profile</h3>
                <div>
                    <span>Username: </span>
                    <span>{username}</span>
                </div>
                <div>
                    <span>Email: </span>
                    <span>{email}</span>
                </div>
                <div>
                    <span>Date of Birth: </span>
                    <span>{birth_date.slice(0,10)}</span>
                </div>
            </Row>
            <Row>{/* Update user info */}
                <h3>Update User Information</h3>
                <Form onSubmit={updateUserInfo}>
                    <Form.Group controlId='formUsername'>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength='5'
                        />
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='formEmail'>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='formBirthDate'>
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
            </Row>
            <Row> {/* Favorite movies */}
                <h3>Favorite Movies</h3>
                <FavoriteMovies user={user} token={token} />
            </Row>
        </Col>
    );
};
