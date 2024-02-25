import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/moviecard";
import { MovieView } from "../movie-view/movieview";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies")
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
       
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

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