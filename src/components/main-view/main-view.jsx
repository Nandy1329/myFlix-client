import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies')
            .then(response => {
              console.log(response);
              return response.json();
            })
            .then(data => {
                const moviesFromApi = data.map(movie => ({
                    id: movie._id,
                    Title: movie.Title,
                    ImagePath: movie.ImagePath,
                    Description: movie.Description,
                    Release: movie.Release,
                    Genre: movie.Genre.Name,
                    }
                ));
                setMovies(moviesFromApi);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => 
        {
            return movie._id !== selectedMovie._id && movie.Genre.Name === selectedMovie.Genre.Name;
        });
        if(similarMovies.length === 0) {
            return (
                <>
                    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /><br />
                    <h2>Similar Movies</h2>
                    <p>There are no similar movies.</p>
                </>
            );
        } else {
            return (
                <>
                    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /><br />
                    <h2>Similar Movies</h2>
                    {similarMovies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    ))}
                </>
            );
        }
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map(movie => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={newSelectedMovie => setSelectedMovie(newSelectedMovie)}
                />
            ))}
        </div>
    );
};