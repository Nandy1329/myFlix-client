import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export const ProfileView = ({ user }) => {
    const [username, setUsername] = useState(user ? user.username : '');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user ? user.email : '');
    const [birth_date, setBirth_date] = useState(user ? user.birth_date : '');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
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
                alert('Update successful.');
                // Update user info state or provide appropriate feedback
            } else {
                setError('Update failed. Please try again.');
            }
        }).catch((error) => {
            console.error('Error updating user:', error);
            setError('An unexpected error occurred. Please try again later.');
        });
    };

    return (
        <>
            <Col>
                <div>
                    <span>Username: </span>
                    <span>{username}</span>
                </div>
                <div>
                    <span>Password: </span>
                    <span>********</span> {/* Consider adding an option to show/hide password */}
                </div>
                <div>
                    <span>Email: </span>
                    <span>{email}</span>
                </div>
                <div>
                    <span>Birthday: </span>
                    <span>{birth_date}</span>
                </div>
                <div>
                    <span>Favorite Movies: </span>
                    <span>{user ? user.favorite_movies : ''}</span>
                </div>
            </Col>
            <Col>
                <Form onSubmit={handleSubmit}>
                    {/* Your form controls */}
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                    {error && <div className="text-danger mt-2">{error}</div>}
                </Form>
            </Col>
        </>
    );
};
