import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        // Your array of movie objects goes here
        { Title: "The Dark Knight", Description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", Director: "Christopher Nolan", Genre: { Name: "Action" }, Image: "https://m.media-amazon.com/images/I/81CLFQwU-WL.__AC_SX300_SY300_QL70_FMwebp_.jpg", },
        { Title: "Guardians of the Galaxy", Description: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.", Director: "James Gunn", Genre: { Name: "Science Fiction" }, Image: "https://upload.wikimedia.org/wikipedia/en/3/33/Guardians_of_the_Galaxy_%28film%29_poster.jpg" },
        { Title: "Saving Private Ryan", Description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.", Director: "Steven Spielberg", Genre: { Name: "Action" }, Image: "https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg" }
    ]); // Added closing bracket here

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
      return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      );
    }
  
    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    }
  
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
    )};