import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Row, Col, Spinner, Form } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import ProfileView from "../profile-view/profile-view";
import "react-toastify/dist/ReactToastify.css";
import "./main-view.scss";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    let parsedUser = null;
    try {
        parsedUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error parsing stored user:", error);
    }

    const [user, setUser] = useState(parsedUser);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            console.error("Token is missing");
            return;
        }

        const fetchMovies = async () => {
            try {
                console.log('Token used for fetch:', token);

                const response = await fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error("Expected an array of movies");
                }

                const fetchDirectorDetails = async (directorId) => {
                    const directorResponse = await fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/directors/${directorId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!directorResponse.ok) {
                        throw new Error(`HTTP error! status: ${directorResponse.status}`);
                    }

                    return await directorResponse.json();
                };

                const moviesFromApi = await Promise.all(data.map(async (movie) => {
                    let directorDetails = { Name: "Unknown" };
                    if (movie.Director && typeof movie.Director === 'string') {
                        directorDetails = await fetchDirectorDetails(movie.Director);
                    } else if (movie.Director && typeof movie.Director === 'object') {
                        directorDetails = movie.Director;
                    }

                    return {
                        ...movie,
                        Director: {
                            Name: directorDetails.Name,
                        },
                    };
                }));

                setMovies(moviesFromApi);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
                toast.error('Failed to fetch movies');
                setLoading(false);
            }
        };

        fetchMovies();
    }, [token]);

    const addFav = (id) => {
        if (!token) {
            console.error("Token is missing");
            return;
        }

        fetch(
            `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}/Movies/${id}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add movie to favorites");
                }
                return response.json();
            })
            .then((user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    setUser(user);
                    toast.success("Added to favorites");
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
                toast.error("Failed to add to favorites");
            });
    };

    const removeFav = (id) => {
        if (!token) {
            console.error("Token is missing");
            return;
        }

        fetch(
            `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}/Movies/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to remove movie from favorites");
                }
                return response.json();
            })
            .then((user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    setUser(user);
                    toast.success("Removed from favorites");
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
                toast.error("Failed to remove from favorites");
            });
    };

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    return (
        <div className="main-view">
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    toast.info("Logged out");
                }}
            />
            <Row className="justify-content-center my-5">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <SignupView />
                                </Col>
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <LoginView
                                        onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                            toast.success("Logged in successfully");
                                        }}
                                    />
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
                                <Col>There are no movies</Col>
                            ) : (
                                <Col md={12}>
                                    <MovieView
                                        movies={movies}
                                        addFav={addFav}
                                        removeFav={removeFav}
                                        user={user}
                                    />
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
                                <Col>There are no movies</Col>
                            ) : (
                                <>
                                    <Row className="justify-content-center mb-5">
                                        <Col md={6}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search movies"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Select
                                                value={selectedGenre}
                                                onChange={(e) => setSelectedGenre(e.target.value)}
                                            >
                                                <option value="">All genres</option>
                                                {[...new Set(movies.map((m) => m.Genre.Name))]
                                                    .sort()
                                                    .map((genre) => (
                                                        <option key={genre} value={genre}>
                                                            {genre}
                                                        </option>
                                                    ))}
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {movies
                                            .filter(
                                                (movie) =>
                                                    (!search ||
                                                        movie.Title.toLowerCase().includes(
                                                            search.toLowerCase()
                                                        )) &&
                                                    (!selectedGenre || movie.Genre.Name === selectedGenre)
                                            )
                                            .map((movie) => (
                                                <Col
                                                    className="mb-4"
                                                    key={movie._id}
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                    lg={3}
                                                >
                                                    <MovieCard
                                                        movie={movie}
                                                        onAddToFavorites={() => addFav(movie._id)}
                                                        onRemoveFromFavorites={() => removeFav(movie._id)}
                                                        isFavorite={
                                                            user && user.FavoriteMovies
                                                                ? user.FavoriteMovies.includes(movie._id)
                                                                : false
                                                        }
                                                        onMovieClick={() => navigate(`/movies/${movie._id}`)}
                                                    />
                                                </Col>
                                            ))}
                                    </Row>
                                </>
                            )
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            !user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <ProfileView
                                    user={user}
                                    movies={movies}
                                    removeFav={removeFav}
                                    setUser={setUser}
                                />
                            )
                        }
                    />
                </Routes>
            </Row>
            <ToastContainer position="top-center" />
        </div>
    );
};
