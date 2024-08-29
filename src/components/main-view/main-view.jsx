import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Row, Col, Spinner, Form } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import ProfileView from "../profile-view/profile-view";
import "react-toastify/dist/ReactToastify.css";

export const MainView = () => {
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    let parsedUser = null;
    try {
        parsedUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error parsing stored user:", error);
    }

    const [user, setUser] = useState(parsedUser);
    const [token, setToken] = useState(storedToken || null);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            console.error("Token is missing");
            navigate("/login"); // Redirect to login if token is missing
            return;
        }

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
            } catch (error) {
                console.error('Error fetching movies:', error.message);
                toast.error('Failed to fetch movies');
            } finally {
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
                toast.error("Failed to remove movie from favorites");
            });
    };

    return (
        <Router>
            <NavigationBar user={user} onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
                navigate("/login");
            }} />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route path="/login" element={<LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                        navigate("/");
                    }} />} />
                    <Route path="/signup" element={<SignupView />} />
                    <Route path="/movies/:movieId" element={<MovieView movies={movies} />} />
                    <Route path="/profile" element={<ProfileView user={user} token={token} setUser={setUser} />} />
                    <Route path="/" element={
                        loading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <>
                                <Form.Control
                                    type="text"
                                    placeholder="Search for a movie..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Form.Select
                                    value={selectedGenre}
                                    onChange={(e) => setSelectedGenre(e.target.value)}
                                >
                                    <option value="">All Genres</option>
                                    {/* Add options for genres here */}
                                </Form.Select>
                                {movies
                                    .filter((movie) => movie.Title.toLowerCase().includes(search.toLowerCase()))
                                    .filter((movie) => !selectedGenre || movie.Genre.Name === selectedGenre)
                                    .map((movie) => (
                                        <Col md={3} key={movie._id}>
                                            <MovieCard movie={movie} addFav={addFav} removeFav={removeFav} />
                                        </Col>
                                    ))}
                            </>
                        )
                    } />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Row>
            <ToastContainer />
        </Router>
    );
};