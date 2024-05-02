import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((doc) => {
                return {
                    id: doc._id,
                    title: doc.Title,
                    release_date: doc.Release_Date,
                    rating: doc.Rating,
                    genre: doc.Genre.Name,
                    director: doc.Director.Name,
                    image: doc.Image_Url,
                    description: doc.Description
                };
            });

            setMovies(moviesFromApi);
        })
        .catch((err) => {
            console.error(err);
        });
}, [token]);




const handleSearch =(e) => {
    
    const query = e.target.value;
    setQuery(query);
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const moviesFromApi = data.map((movie) => ({
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
            year: movie.Year,
          }));

          const storedMovies = JSON.parse(localStorage.getItem("movies"));

          let filteredMovies = [];
          if (Array.isArray(storedMovies)) {
            filteredMovies = storedMovies.filter((movie) => {
              return (
                movie.title.toLowerCase().includes(query.toLowerCase()) ||
                (movie.genre &&
                  movie.genre
                    .map((g) => g.toLowerCase())
                    .includes(query.toLowerCase()))
              );
            });
          }

          setMovies([...moviesFromApi, ...filteredMovies]);
        }
      });
  }, [token, query]);

  const isLoggedIn = Boolean(user);
  const hasMovies = Boolean(movies && movies.length > 0);

  const renderMovies = () => (
    <Row>
  {movies.map((movie) => (
  <Col className="mb-5" sm={6} md={4} lg={3} key={movie.id}>
    <MovieCard
      isFavorite={user && user.FavoriteMovies.includes(movie.Title)}
      movie={movie}
    />
  </Col>
      ))}
    </Row>
  );

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        query={query}
        handleSearch={handleSearch}
        movies={movies}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <br />
      <Row className="justify-content-center">
        <Routes>
          <Route
            path="/users"
            element={isLoggedIn ? <Navigate to="/" /> : <SignupView />}
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <ProfileView
                  token={token}
                  user={user}
                  movies={movies}
                  onSubmit={setUser}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                !hasMovies ? (
                  <Col>The list is empty!</Col>
                ) : (
                  renderMovies()
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
