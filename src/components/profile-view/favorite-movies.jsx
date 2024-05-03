import { React, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ user, token }) => {

    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        if (!token) {
            return;
        };

        fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((userData) => {
                const favoriteMoviesList = userData.Favorite_Movies;
                console.log('log users list of favorite movies: ', favoriteMoviesList);

                favoriteMoviesList.map((object) => {
                    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies/${object.Title}', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((response) => response.json())
                        .then((movieData) => {
                            console.log('log movie data: ', movieData);
                            return movieToAdd = {
                                id: movieData._id,
                                title: movieData.Title,
                                release_date: movieData.Release_Date,
                                genre: movieData.Genre.Name,
                                director: movieData.Director.Name,
                                image: movieData.Image_Url,
                                description: movieData.Description
                            };
                        }).then((movieToAdd) => {
                            console.log('log movie to add to array: ', movieToAdd);
                            setFavoriteMovies([
                                ...favoriteMovies, movieToAdd
                            ]);
                            console.log('log favorite movies array: ', favoriteMovies);
                        });
                });
            });
    }, [user, token]);

    return (
        <>
            {favoriteMovies.map((movie) => (
                <Col className='mb-4' key={movie.id} md={3}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </>
    );
};