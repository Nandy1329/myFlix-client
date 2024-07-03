import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import "./main-view.scss";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [filter, setFilter] = useState("");

    const handleToggleFavorite = (movieId, isFavorite) => {
        console.log(`Toggle favorite for movie with ID ${movieId} (${isFavorite ? 'Add to favorites' : 'Remove from favorites'})`);
    };

    useEffect(() => {
        if (!token) return;

        fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        Description: movie.Description,
                        Genre: movie.Genre,
                        Director: movie.Director,
                        Featured: movie.Featured,
                        Year: movie.Year,
                        ImagePath: movie.ImagePath,
                    };
                });
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, [token]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredMovies = movies.filter((movie) => {
        if (!movie.Title) {
            console.error("Movie title is undefined:", movie);
            return false;
        }
        return movie.Title.toLowerCase().includes(filter.toLowerCase());
    });

    const onMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const addFav = (movieId) => {
        // Your logic to add the movie to favorites
        console.log(`Add movie with ID ${movieId} to favorites`);
    };

    const removeFav = (movieId) => {
        // Your logic to remove the movie from favorites
        console.log(`Remove movie with ID ${movieId} from favorites`);
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
                                            <LoginView onLoggedIn={(user) => setUser(user)} />
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
                                        <SignupView className="signUp" />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty</Col>
                                ) : (
                                    <Col md={8} className="movieView">
                                        <MovieView movies={movies} />
                                    </Col>
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
                                                    onMovieClick={onMovieClick}
                                                    isFavorite={user && user.FavoriteMovies ? user.FavoriteMovies.includes(movie._id) : false}
                                                    addFav={addFav}
                                                    removeFav={removeFav}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    {user && (
                        <Route path="/profile" element={
                            <ProfileView 
                                user={user} 
                                setUser={setUser} 
                                removeFav={removeFav} 
                                addFav={addFav} 
                            />
                        } />
                    )}
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
