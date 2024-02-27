import { useState, useEffect } from "react";
<<<<<<<< Updated upstream:src/components/main-view/mainview.jsx
import { MovieCard } from "../movie-card/moviecard";
import { MovieView } from "../movie-view/movieview";
========
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
>>>>>>>> Stashed changes:src/components/main-view/main-view.jsx

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies")
      .then(response => response.json())
      .then((data) => {
<<<<<<<< Updated upstream:src/components/main-view/mainview.jsx
        console.log(data);
        setMovies(data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
========
        let moviesFromAPI = data.map((movie) => {
          return {
            _id: movie._id,
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
        
        console.log(moviesFromAPI);
        setMovies(moviesFromAPI);
>>>>>>>> Stashed changes:src/components/main-view/main-view.jsx
      });
  }, []); // Added closing brackets for useEffect

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
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>

  );
}