import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user and token from local storage when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(localStorage.getItem('user'));
      setToken(token);
    }
  }, []);

  // Fetch movies from API when component mounts
  useEffect(() => {
    fetch('https://cine-verse-b8832aa84c3e.herokuapp.com/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => ({
          id: doc.key,
          title: doc.Title,
          description: doc.Description
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <p>Or please sign up as a new user below:</p>
        <SignupView />
      </>
    );
  }
  

  return (
    <Row className="main-view justify-content-md-center">
      {selectedMovie ? (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      ) : (
        <>
          {movies.map((movie) => (
            <Col md={3} key={movie.id}>
              <MovieCard movie={movie} onMovieClick={(movie) => setSelectedMovie(movie)} />
            </Col>
          ))}
        </>
      )}
      <p>Or please sign up as a new user below:</p>
      <SignupView />
      {user && (
        <>
          <span>Logged in as: {user}</span>
          <br />
          <br />
          <button onClick={() => { setUser(null); localStorage.removeItem('token'); localStorage.removeItem('user'); }}>Log Out</button>
        </>
      )}
    </Row>
    );
  } 
