import React from "react";
import PropTypes from "prop-types";

const MovieView = ({ movie, addMovie, removeMovie, username, FavoriteMovies, onBackClick }) => {
  // Component implementation
  return (
    <div>
      {/* MovieView content */}
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
  }).isRequired,
  addMovie: PropTypes.func.isRequired,
  removeMovie: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export { MovieView };
