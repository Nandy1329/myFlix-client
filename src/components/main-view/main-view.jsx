import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (!token) { 
            return;
        }

        fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => ({
                    _id: movie._id,
                    Title: movie.Title,
                    ImagePath: movie.ImagePath,
                    Director: {
                        Name: movie.Director.Name,
                        Bio: movie.Director.Bio,
                        Birth: movie.Director.Birth,
                    },
                    Description: movie.Description,
                    ReleaseYear: movie.ReleaseYear,
                    Genre: movie.Genre.Name,
                }));
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error(error);
            });
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

            <Row className='justify-content-md-center cards-container'>
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
                                    <LoginView onLoggedIn={(user, token) => {
                                        setUser(user);
                                        setToken(token);
                                        localStorage.setItem("user", JSON.stringify(user));
                                        localStorage.setItem("token", token);
                                    }} />
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
                                <Col>The list is empty!</Col>
                            ) : (
                                <Col md={8}>
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
                                <Col>The list is empty!</Col>
                            ) : (
                                <>
                                    {movies.map((movie) => (
                                        <Col className="mb-4" key={movie._id} md={3}>
                                            <MovieCard 
                                                movie={movie}
                                                user={user}
                                                token={token}
                                                setUser={setUser}
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
                                <Col md={5}>
                                    <ProfileView
                                        movies={movies}
                                        user={user}
                                        token={token}
                                        setUser={setUser}
                                    />
                                </Col>
                            )
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
