import PropTypes from 'prop-types';
import React from 'react';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <h2>{movie.Title}</h2>
            <img src={movie.Image} alt="movie cover"/>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span> {/* Access the director's name */}
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span> {/* Access the genre's name */}
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
