import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import "../../index.scss";

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
              Name: movie.Genre ? movie.Genre.Name : 'N/A'
            },
            Director: {
              Name: movie.Director ? movie.Director.Name : 'N/A'
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
          <img src={movie.ImagePath} alt={movie.Title} /> {/* This line will render the image */}
          <p>{movie.Description}</p>
        </div>
      ))}
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<MainView />);