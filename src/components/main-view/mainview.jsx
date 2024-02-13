import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./index.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies")
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Year: movie.Year,
            Genre: {
              Name: movie.Genre.Name
            },
            Director: {
              Name: movie.Director.Name
            }
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      {movies.map(movie => (
        <div key={movie._id}>
          <h2>{movie.Title}</h2>
          <p>{movie.Description}</p>
        </div>
      ))}
    </div>
  );
};

ReactDOM.render(<MainView />, document.getElementById('root'));