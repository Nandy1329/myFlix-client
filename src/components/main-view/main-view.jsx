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
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            console.error("Token is missing, redirecting to login...");
            navigate("/login");
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
                            Name: directorDetails.Name,
                        },
                    };
                }));

                    };
                }));

                setMovies(moviesFromApi);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
                toast.error('Failed to fetch movies');
            } finally {
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
                toast.error('Failed to fetch movies');
                setLoading(false);
            }
        };

        fetchMovies();
    }, [token, navigate]);

    const addFav = (id) => {
        if (!token) {
            console.error("Token is missing");
            return;
        }

        if (!token) {
            console.error("Token is missing");
            return;
        }

        fetch(
            `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user?.Username}/Movies/${id}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                if (!response.ok) {
                    throw new Error("Failed to add movie to favorites");
                }
                return response.json();
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

        if (!token) {
            console.error("Token is missing");
            return;
        }

        fetch(
            `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user?.Username}/Movies/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                if (!response.ok) {
                    throw new Error("Failed to remove movie from favorites");
                }
                return response.json();
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
                toast.error("Failed to remove movie from favorites");
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
        <div>
            <NavigationBar user={user} />
            <Row>
                {movies.map((movie) => (
                    <Col key={movie._id} md={3}>
                        <MovieCard movie={movie} addFav={addFav} removeFav={removeFav} />
                    </Col>
                ))}
            </Row>
            <ToastContainer />
        </Router>
    );
};