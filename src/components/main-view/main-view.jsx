import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "react-bootstrap";


export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);


  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            ImagePath: movie.ImagePath,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
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
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-center">
        <Routes>
          <Route
            path="/users"
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
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <Row className='justify-content-center'>
                <Col
                  sm={12} md={9} lg={6}
                >
                {user ? (
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                  />) : (<Navigate to="/login" />)
                  }                
                </Col>
              </Row>
            }
          />
          <Route
            path="/profile/:movieId"
            element={
                    <>
                      {!user ? (
                        <Navigate to="/login" replace />
                      ) : movies.length === 0 ? (
                        <Col>The list is empty!</Col>
                      ) : (
                        <Col md={8}>
                          <MovieView
                            movies={movies}
                          />
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
                            <Col className="mb-5" key={movie.id} sm={6} md={4} lg}{3}>
                              <MovieCard 
                              isFavorite={user.FavoriteMovies.includes(movie.Title)}
                              movie={movie}
                              />
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