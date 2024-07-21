import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieView } from '../movie-view/movie-view';
import ProfileView from '../profile-view/profile-view';
import { MovieCard } from '../movie-card/movie-card';

const MainView = () => {
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        return storedUser ? { ...storedUser, FavoriteMovies: storedUser.FavoriteMovies || [] } : null;
    });
    const [movies, setMovies] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [filter, setFilter] = useState("");

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredMovies = Array.isArray(movies) ? movies.filter((movie) =>
        movie.Title.toLowerCase().includes(filter.toLowerCase())
    ) : [];

    const addFav = (movieId) => {
        const updatedUser = {
            ...user,
            FavoriteMovies: Array.isArray(user.FavoriteMovies) ? [...user.FavoriteMovies, movieId] : [movieId]
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const removeFav = (movieId) => {
        const updatedUser = {
            ...user,
            FavoriteMovies: Array.isArray(user.FavoriteMovies) ? user.FavoriteMovies.filter(id => id !== movieId) : []
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setMovies(data.movies || []);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
            }
        };

        if (token) {
            fetchMovies();
        }
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Container>
                <Row className="justify-content-md-center movie-card-container">
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Container>
                                        <Col md={12} className="justify-content-md-center">
                                            <LoginView onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                                localStorage.setItem('token', token);
                                            }} />
                                        </Col>
                                    </Container>
                                )
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={12}>
                                        <SignupView className="signUp" />
                                    </Col>
                                )
                            }
                        />
                        <Route
                            path="/movies/:movieId"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty</Col>
                                ) : (
                                    <Col md={8} className="movieView">
                                        <MovieView movies={movies} />
                                    </Col>
                                )
                            }
                        />
                        <Route
                            path="/"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The List is Empty!</Col>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Search movies..."
                                            value={filter}
                                            onChange={handleFilterChange}
                                        />
                                        {filteredMovies.map((movie) => (
                                            <Col md={3} sm={6} xs={12} className="movie-card-col" key={movie._id}>
                                                <MovieCard
                                                    movie={movie}
                                                    onAddToFavorites={addFav}
                                                    onRemoveFromFavorites={removeFav}
                                                    isFavorite={user.FavoriteMovies.includes(movie._id)}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )
                            }
                        />
                        {user && (
                            <Route
                                path="/profile"
                                element={
                                    <ProfileView
                                        movies={movies}
                                        user={user}
                                        setUser={setUser}
                                        addFav={addFav}
                                        removeFav={removeFav}
                                    />
                                }
                            />
                        )}
                    </Routes>
                </Row>
            </Container>
        </BrowserRouter>
    );
};

export default MainView;
