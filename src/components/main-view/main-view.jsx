import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";
import { Spinner, Row, Col, Form } from "react-bootstrap";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./main-view.scss";
import { FavoriteMovies } from "../profile-view/favorite-movies";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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
                setMovies(data.movies);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
            }
        };
    
        if (token) {
            fetchMovies();
        }
        fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error("Expected an array of movies");
                }
                const moviesFromApi = data.map(
                    ({ _id, Title, ImagePath, Description, Year, Genre, Director }) => ({
                        _id,
                        Title,
                        ImagePath,
                        Description,
                        Year,
                        Genre: {
                            Name: Genre?.Name,
                        },
                        Director: {
                            Name: Director?.Name,
                        },
                    })
                );
                setMovies(moviesFromApi);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
                toast.error("Failed to fetch movies");
                setLoading(false);
            });
    }, [token]);

    const addFav = (id) => {
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
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to add movie to favorites");
                }
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
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to remove movie from favorites");
                }
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
                                <Col>The list is empty</Col>
                            ) : (
                                <>
                                    <Form className="form-inline mt-5 d-flex justify-content-center">
                                        <Form.Control
                                            className="mx-5 mx-md-0"
                                            type="search"
                                            id="searchForm"
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search for ..."
                                            aria-label="Search"
                                        />
                                        <Form.Select
                                            className="ms-3 w-25"
                                            aria-label="Default select genre"
                                            onChange={(e) => setSelectedGenre(e.target.value)}
                                        >
                                            <option value="">Search by genre</option>
                                            <option value="Science Fiction">Science Fiction</option>
                                            <option value="Horror">Horror</option>
                                            <option value="Action">Action</option>
                                            <option value="Fantasy">Fantasy</option>
                                            <option value="Thriller">Thriller</option>
                                        </Form.Select>
                                    </Form>
                                    {movies
                                        .filter((movie) =>
                                            selectedGenre === ""
                                                ? movie
                                                : movie.Genre.Name === selectedGenre
                                        )
                                        .filter((movie) =>
                                            search === ""
                                                ? movie
                                                : movie.Title.toLowerCase().includes(search.toLowerCase())
                                        )
                                        .map((movie) => (
                                            <Col
                                                md={6}
                                                lg={4}
                                                xl={3}
                                                className="mb-5 col-8"
                                                key={movie._id}
                                            >
                                                <MovieCard
                                                    movie={movie}
                                                    onAddToFavorites={addFav}
                                                    onRemoveFromFavorites={removeFav}
                                                    isFavorite={user.FavoriteMovies ? user.FavoriteMovies.includes(movie._id) : false}
                                                    onMovieClick={(movieId) => navigate(`/movies/${movieId}`)}
                                                />
                                            </Col>
                                        ))}
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
                                <Col>
                                    <ProfileView
                                        user={user}
                                        movies={movies}
                                        removeFav={removeFav}
                                        addFav={addFav}
                                        setUser={setUser}
                                    />
                                </Col>
                            )
                        }
                    />
                </Routes>
            </Row>
            <ToastContainer />
        </div>
    );
};
