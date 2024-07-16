import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";
import FavoriteMovies  from "../profile-view/favorite-movies";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

const MainContent = ({
  user,
  token,
  movies,
  setMovies,
  loading,
  setLoading,
  filteredMovies,
  setFilteredMovies,
  addMovie,
  removeMovie,
  onLoggedOut,
  setUser
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return;
    }
    setLoading(true);

    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched movies:', data);
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        setLoading(false);
      });
  }, [token, setMovies, setLoading]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies, setFilteredMovies]);

  const handleSearchInput = (e) => {
    const searchWord = e.target.value.toLowerCase();
    const tempArray = movies.filter((m) =>
      m.Title.toLowerCase().includes(searchWord)
    );
    setFilteredMovies(tempArray);
  };

  const handleMovieClick = (movie) => {
    console.log(`Movie clicked: ${movie.Title}`);
    navigate(`/movies/${movie._id}`);
  };

  const showSpinner = () => (
    <Col className="spinner-wrapper">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Col>
  );

  return (
    <>
      <NavigationBar
        user={user}
        onLoggedOut={onLoggedOut}
        handleSearchInput={handleSearchInput}
      />
      <Row className="justify-content-md-center mt-5 main-body-container">
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
                  <LoginView onLoggedIn={(user) => setUser(user)} />
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
                showSpinner()
              ) : (
                <Col md={8}>
                  <MovieView
                    movie={movies.find(
                      (m) => m._id === window.location.pathname.split("/")[2]
                    )}
                    addMovie={addMovie}
                    removeMovie={removeMovie}
                    username={user.Username}
                    FavoriteMovies={user.FavoriteMovies}
                    onBackClick={() => window.history.back()}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col>
                  <ProfileView
                    user={user}
                    setUser={setUser}
                    movies={movies}
                    token={token}
                  />
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
                <div>The list is empty!</div>
              ) : (
                <>
                  {filteredMovies.map((movie) => (
                    <Col className="mb-5" key={movie._id} md={3}>
                      <MovieCard
                        movie={movie}
                        onMovieClick={handleMovieClick}
                        isFavorite={user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)}
                        addFav={addMovie}
                        removeFav={removeMovie}
                      />
                    </Col>
                  ))}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </>
  );
};

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const addMovie = (movieId) => {
    fetch(
      `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Sorry, you're not authorized to access this resource.");
        } else if (response.status === 409) {
          throw new Error("You already added this movie to the list.");
        } else if (response.ok) {
          return response.json();
        }
      })
      .then((updatedUser) => {
        toast.success("Movie has been added to your Favorite Movies.");
        setUser(updatedUser);
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred while trying to add movie. Please try again later.");
        console.error("An error occurred:", error);
      });
  };

  const removeMovie = (movieId) => {
    fetch(
      `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Sorry, you're not authorized to access this resource.");
        } else if (response.ok) {
          return response.json();
        }
      })
      .then((updatedUser) => {
        toast.success("Movie has been removed from your Favorite Movies.");
        setUser(updatedUser);
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred while trying to delete. Please try again later.");
        console.error("An error occurred:", error);
      });
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <MainContent
        user={user}
        token={token}
        movies={movies}
        setMovies={setMovies}
        loading={loading}
        setLoading={setLoading}
        filteredMovies={filteredMovies}
        setFilteredMovies={setFilteredMovies}
        addMovie={addMovie}
        removeMovie={removeMovie}
        onLoggedOut={onLoggedOut}
        setUser={setUser}
      />
    </BrowserRouter>
  );
};

export default MainView;
