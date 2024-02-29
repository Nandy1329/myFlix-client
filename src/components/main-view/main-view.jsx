import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies")
      .then(response => response.json())
      .then((data) => {
        // Assign the result to the state
        const moviesFromAPI = data.doc.map((doc) => {
          return {
            id: movie.id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
                Name: movie.Genre ? movie.Genre.Name : 'N/A' // Check if movie.Genre is not null or undefined
            },
            Director: {
                Name: movie.Director ? movie.Director.Name : 'N/A' // Check if movie.Director is not null or undefined
            }
          };
        });
        

        setMovies(moviesFromAPI);
      });
  }, []); 

  if (!user) {
    return <LoginView />;
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
  if (movies.length === 0) return <div> The list is empty! </div>;

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>

  );
}