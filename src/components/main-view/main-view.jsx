import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          genre: movie.Genre.Name,
          director: movie.Director.Name,
        }));
        setMovies(moviesFromApi);
      });

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

    setMovies(filteredMovies);
  }, [query, token]);

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
            element={
              user ? <Navigate to="/" /> : <SignupView />
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <LoginView onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }} />
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView
                  token={token}
                  user={user}
                  movies={movies}
                  onSubmit={(user) => setUser(user)}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
       <Route
  path="/movies/:movieId"
  element={
    !user ? (
      <Navigate to="/login" />
    ) : !movies || movies.length === 0 ? (
      <Col>The list is empty!</Col>
    ) : (
      <MovieView movies={movies} />
    )
  }
/>
<Route
  path="/"
  element={
    !user ? (
      <Navigate to="/login" />
    ) : !movies || movies.length === 0 ? (
      <Col>The list is empty!</Col>
    ) : (
      movies.map((movie) => (
  <Col className="mb-5" key={movie._id} sm={6} md={4} lg={3}>
    <MovieCard
      isFavorite={user.FavoriteMovies.includes(movie.Title)}
      movie={movie}
    />
  </Col>
))
    )
  }
/>
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
