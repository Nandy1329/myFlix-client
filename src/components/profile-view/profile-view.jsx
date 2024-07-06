import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ movies, user, setUser, addFav, removeFav }) => {
    const localUser = JSON.parse(localStorage.getItem("user")) || user;
    const [username, setUsername] = useState(localUser.Username || "");
    const [password, setPassword] = useState(localUser.Password || "");
    const [email, setEmail] = useState(localUser.Email || "");

    useEffect(() => {
        // Update localUser state whenever localStorage changes (e.g., on login or update)
        const updatedUser = JSON.parse(localStorage.getItem("user")) || user;
        if (updatedUser) {
            setUsername(updatedUser.Username || "");
            setPassword(updatedUser.Password || "");
            setEmail(updatedUser.Email || "");
        }
    }, [user]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        // Implement update logic here
        // Example: Call an API to update user profile
    };

    const fav = movies.filter((movie) => localUser.FavoriteMovies && localUser.FavoriteMovies.includes(movie._id));

    return (
        <div>
            <h1>Profile</h1>
            <Row>
                <Col>
                    <Form onSubmit={handleUpdateProfile}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
            <h2>Favorite Movies</h2>
            <Row>
                {fav.map((movie) => (
                    <Col key={movie._id} md={3}>
                        <MovieCard 
                            movie={movie} 
                            onAddToFavorites={addFav} 
                            onMovieClick={() => console.log(`Open movie ${movie._id}`)}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

ProfileView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            ImagePath: PropTypes.string.isRequired,
        })
    ).isRequired,
    user: PropTypes.shape({
        Username: PropTypes.string,
        Password: PropTypes.string,
        Email: PropTypes.string,
        FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    setUser: PropTypes.func.isRequired,
    addFav: PropTypes.func.isRequired,
    removeFav: PropTypes.func.isRequired,
};

export default ProfileView;
