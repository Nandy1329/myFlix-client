import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
  if (!token) {
    return;
  }

  fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user}', {
    method: 'GET',
    headers: {
    Authorization: `Bearer ${token}`,  }
    })
    .then((response) => response.json())
    .then((data) => {
      const userFromApi = ((doc) => {
      return {
        Username: doc.Username,
        Email: doc.Email,
        Birthday: doc.Birthday,
        FavoriteMovies: doc.FavoriteMovies,
      };
    });

    setUser(userFromApi);
    setFavoriteMovies(user.FavoriteMovies);
  })
  .catch((error) => {
    console.error(error);
  });


  fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
    const moviesFromApi = data.map((movie) => {
      return {
      _id: movie._id,
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
    setMovies(moviesFromApi);
    });
  }, [token]);

  return (
  <BrowserRouter>
    <NavigationBar
      user={user}
      onLoggedOut={() => {
        setUser(null);
      }}
    />
    <Row className='justify-content-md-center'>
      <Routes>
        <Route
          path="/signup"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={(user) => setUser(user)} />
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
                <Col>The list is empty!</Col>
              ) : (
                <Col md={8}>
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
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </>
              )}
            </>
          }
        />
      </Routes>
    </Row>
  </BrowserRouter>
);
};