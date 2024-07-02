import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import "./main-view.scss";
import { Row } from "react-bootstrap";
import { Col, Form, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");

    // Connect App to API with Hook
    useEffect(() => {
        if (!token) {
            return;
        }

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
                  ImagePath: movie.ImagePath,
                  Description: movie.Description,
                  Year: movie.Year,
                  Genre: {
                      Name: movie.Genre.Name
                  },
                  Director: {
                      Name: movie.Director.Name
                  }
              };
          });
          setMovies(moviesFromApi);
      });
}, [token]);

// Add Favorite Movie
const addFav = (id) => {

  fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}/Movies/${id}`, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        alert("Failed to add");
    }
}).then((user) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        //setIsFavorite(true);
    }
}).catch(error => {
    console.error('Error: ', error);
});
};

// Remove Favorite Movie
const removeFav = (id) => {

  fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}/Movies/${id}`, {

    method: "DELETE",
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        alert("Failed to remove")
    }
}).then((user) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        //setIsFavorite(false);
    }
}).catch(error => {
    console.error('Error: ', error);
});
};

return (
<BrowserRouter>
    <NavigationBar
        user={user}
        onLoggedOut={() => {
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }}
    />
    <Row className="justify-content-center my-5">
        <Routes>
            {/* Return SignupView if not logged in, otherwise main page */}
            <Route
            path="/signup"
            element={
                <>
                    {user? (
                        <Navigate to="/" />
                    ) : (
                        <Col md={5}>
                            <SignupView />
                        </Col>
                    )}
                </>
            }
            />
            {/* Return LoginView if not logged in, otherwise main page */}
            <Route 
                path="/login"
                element={
                    <>
                        {user ? (
                            <Navigate to="/" />
                        ) : (
                            <Col md={5}>
                                <LoginView 
                                    onLoggedIn={(user, token) => {
                                        setUser(user);
                                        setToken(token);
                                    }}
                                />
                            </Col>
                        )}
                    </>
                }
            />
            {/* Return MovieView if logged in, otherwise LoginView */}
            <Route 
                path="/movies/:movieId"
                element={
                    <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : movies.length === 0 ? (
                            <Col>There is no movie</Col>
                        ) : (
                            <Col md={12}>
                                <MovieView 
                                movies={movies}
                                removeFav={removeFav}
                                addFav={addFav}
                                />
                            </Col>
                        )}
                    </>
                }
            />
            {/* Return MovieCards if logged in, otherwise LoginView */}
            <Route 
            path="/"
            element={
                <>
                    {!user ? (
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
                                <Form.Select className="ms-3 w-25" aria-label="Default select genre" onChange={(e) => setSelectedGenre(e.target.value)}>
                                    <option value="" selected>Search by genre</option>
                                    <option value="Science Fiction">Science Fiction</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Action">Action</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Thriller">Thriller</option>
                                </Form.Select>
                            </Form>
                            {movies.filter((movie) => {
                                return selectedGenre === ""
                                ? movie
                                : movie.Genre.Name === selectedGenre;
                            })
                            .filter((movie) => {
                                return search === ""
                                ? movie
                                : movie.Title.toLowerCase().includes(search.toLowerCase());
                            })
                            .map((movie, movieId) => (
                                <Col md={6} lg={4} xl={3} className="mb-5 col-8" key={movieId}>
                                    <MovieCard
                                    movie={movie} 
                                    removeFav={removeFav} 
                                    addFav={addFav} 
                                    isFavorite={user.FavoriteMovies.includes(movie._id)} 
                                    />
                                </Col>
                            ))}
                        </>
                    )}
                </>
            }
            />
            {/* Return ProfileView if logged in, otherwise LoginView */}
            <Route
            path="/profile"
            element={
                <>
                    {!user ? (
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
                    )}
                </>
            }
            />
        </Routes>
    </Row>
</BrowserRouter>
);
};