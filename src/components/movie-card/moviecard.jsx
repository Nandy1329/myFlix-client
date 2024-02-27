import PropTypes from "prop-types";
import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
    console.log(movie); // This will log the movie prop to the console

    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.Title}
        </div>
    );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({ // Changed from Movie to movie
        _id: PropTypes.string.isRequired,
        ImagePath: PropTypes.string,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string, // Removed isRequired
            Birth: PropTypes.string.isRequired,
          }),
        }),
        onMovieClick: PropTypes.func.isRequired,
      };