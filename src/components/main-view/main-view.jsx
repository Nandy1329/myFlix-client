import React, { useState, useEffect } from 'react';
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
  const [selectedMovie, setSelectedMovie] = useState(null)

  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
  
    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, [token]); // Dependency array moved here

  return (
    <div>
      {movies.map(movie => (
        <div key={movie._id} onClick={() => onMovieClick(movie)}>
          <h2>{movie.Title}</h2>
          <p>{movie.Description}</p>
          <img src={movie.ImageURL} alt={movie.Title} style={{ width: '100%', maxWidth: '300px', height: 'auto' }} />
          {/* Add checks for movie.Genre as it might be undefined for some movies */}
          {movie.Genre && <p>Genre: {movie.Genre.Name}</p>}
          {movie.Genre && <p>{movie.Genre.Description}</p>}
        </div>
      ))}
    </div>
  );
};