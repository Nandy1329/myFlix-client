import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  // 
  useEffect(() => {
    if (!token) {
      return;
    }
    // Fetch movies from API when component mounts

    fetch("https://movieapicf-30767e813dee.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
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


  return (
    <Row >
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col className="justify-content-md-center">
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <div>
          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
            variant="outline-secondary">Logout</Button>

          {movies.map((movie) => (
            <Col className="mb-5" key={movie._id} md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </div>

      )}
    </Row>
  )
}