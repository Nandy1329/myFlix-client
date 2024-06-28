import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import { Row, Col, Container, Card, Form, Button } from 'react-bootstrap';

export const ProfileView = () => {
    const [user, setUser] = useState(null);
    const [favMovies, setFavMovies] = useState([]);
    const [formData, setFormData] = useState({
        Username: '',
        Password: '',
        Email: '',
    });
    const storedToken = localStorage.getItem('token');
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const updateFavMovies = (movieId) => {
        setFavMovies(favMovies.filter((m) => m.id !== movieId));
    };

    const fetchFavMovies = () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name,
                        },
                        Director: {
                            Name: movie.Director.Name,
                        },
                        Year: movie.Year,
                    };
                });
                setFavMovies(moviesFromAPI.filter((m) => currentUser.FavoriteMovies.includes(m.id)));
            }
            );
    }

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then
            .then((users) => {
                const foundUser = users.find((u) => u._id === currentUser._id);
                const updateFormData = {
                    ...formData,
                    Username: foundUser.Username,
                    Email: foundUser.Email,
                };
                setUser(foundUser);
                setFormData(updateFormData);

                fetchFavMovies();
            })
            .catch((err) => console.error('Error fetching user data:', error));
    }, [token]);

    useEffect(() => {
        console.log('Favorite movies updated!', favMovies);
    }, [favMovies]);

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { Password, ...userWithoutPassword } = user;
        const updateFormData = {
            ...userWithoutPassword,
            ...formData,
        };

        fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateFormData),
        })
            .then((response) => response.json())
            .then((updatedUser) => {
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                alert('Profile updated successfully!');
            })
            .catch((err) => console.error('Error updating profile:', err));
    };

    const handleDelete = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user._id}', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert('Your account has been deleted.');
                    localStorage.clear();
                    window.location.reload

                    console.log('${user.Username} has been deleted.');
                } else {
                    throw new Error('Failed to delete user.');
                }
            })
            .catch((err) => console.error('Error deleting user:', err));
    };

    return (
        <Container>
            {user && (
                <Row>
                    <Col xs={12} sm={4}>
                        <Card>
                            <Card.Body>
                                <UserInfo
                                    Username={user.Username}
                                    Email={user.Email}
                                    Birthday={user.Birthday}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Card>
                            <Card.Body>
                                <form className="profile-form h-100" onSubmit={handleSubmit}>
                                    <h4>Want to change some info?</h4>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Username"
                                            value={formData.Username}
                                            onChange={(e) => handleUpdate(e)}
                                            required
                                            minLength="5"
                                            placeholder="username must be at least 5 characters"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="Password"
                                            onChange={(e) => handleUpdate(e)}
                                            required
                                            minLength="5"
                                            placeholder="password must be at least 5 characters"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email Address:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            value={formData.Email}
                                            onChange={(e) => handleUpdate(e)}
                                            required
                                            placeholder="please enter your email address"
                                        />
                                    </Form.Group>
                                    <button
                                        className="back-button"
                                        style={{ cursor: 'pointer' }}
                                        variant="primary"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12}>
                        <FavoriteMovies
                            favoriteMovieList={favMovies}
                            updateFavMovies={updateFavMovies}
                        />
                    </Col>
                </Row>
            )}
            <button
                className="back-button"
                style={{ cursor: 'pointer' }}
                onClick={handleDeregister}
            >
                Deregister
            </button>
        </Container>
    );
};