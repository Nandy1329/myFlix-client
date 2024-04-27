import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import { UpdateUser } from './update-user';
import { FavoriteMovies } from './favorite-movies';
import { PiUserSquareDuotone } from "react-icons/pi";

export const ProfileView = ({ user, movies, token }) => {
    const [username, setUsername] = useState(user.Username);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [password, setPassword] = useState('');
    const [favoriteMovies, setFavoriteMovies] = useState([]); 

    const formData = {
        UserName: username,
        Email: email,
        Birthday: birthday,
        Password: password
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const isoDate = new Date(birthday);

        const updatedUserData = {
            UserName: username,
            Email: email,
            Birthday: isoDate,
            Password: password
        };

       
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
                setBirthday(e.target.value);
                break;
            default:
        }
    };

    return (
        <>
            <Row>
                <Card>
                    {/* Placeholder image */}
                    <Card.Img src="holder.js/171x180" /> 
                    <Card.Body>
                        <Card.Title><h2>My Profile</h2></Card.Title>
                        <Card.Text>
                            <h4>{username}</h4>
                            <h4>{email}</h4>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Col>
                    <UpdateUser
                        formData={formData}
                        handleUpdate={handleUpdate}
                        handleSubmit={handleSubmit}
                    />
                </Col>
            </Row>
            <br />
            <hr />
            <br />
            <Row>
                <Col className="mb-5" xs={12} md={8}>
                    {/* Pass favoriteMovies and setFavoriteMovies to FavoriteMovies component */}
                    <FavoriteMovies
                        user={user}
                        favoriteMovies={favoriteMovies}
                        setFavoriteMovies={setFavoriteMovies}
                    />
                </Col>
            </Row>
        </>
    );
};

ProfileView.propTypes = {
    user: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired
};
