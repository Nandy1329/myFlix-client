import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleToggleFavorite = (movieId, isFavorite) => {
        console.log(`Toggle favorite for movie with ID ${movieId} (${isFavorite ? 'Add to favorites' : 'Remove from favorites'})`);
    };

    const handleMovieSelect = (movieId) => {
        const selectedMovie = movies.find(movie => movie.id === movieId);
        setSelectedMovie(selectedMovie);
    };


        useEffect(() => {
            if (!token) return;
        
            console.log('Fetching movies with token:', token);
        
            fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    console.log('Response:', response);
                    return response.json();
                })
                .then((data) => {
                    console.log('Data:', data);
                    if (data && Array.isArray(data)) {
                        // rest of your code...
                    } else {
                        console.error('Invalid data format:', data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching movies:', error);
                });
        }, [token]);

    const MovieDetailsWrapper = () => {
        const { movieID } = useParams();
        useEffect(() => {
            if (movieID) {
                handleMovieSelect(movieID);
            }
        }, [movieID]);

        return (
            selectedMovie ? <MovieView movie={selectedMovie} /> : <Col>Loading...</Col>
        );
    };

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
            <Row className="justify-content-md-center movie-card-container">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Container>
                                        <Col md={12} className="justify-content-md-center">
                                            <LoginView onLoggedIn={(user) => {
                                                setUser(user);
                                                setToken(user.token);
                                            }} />
                                        </Col>
                                    </Container>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={12}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieID"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <MovieDetailsWrapper />
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The List is Empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col md={3} sm={6} xs={12} className="movie-card-col" key={movie.id}>
                                                <MovieCard
                                                    movie={movie}
                                                    onToggleFavorite={handleToggleFavorite}
                                                    onSelectMovie={() => handleMovieSelect(movie.id)}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    {user && (
                        <Route
                            path="/profile"
                            element={<ProfileView user={user} />}
                        />
                    )}
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
