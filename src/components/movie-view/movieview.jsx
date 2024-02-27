import PropTypes from 'prop-types';

import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
          <div> 
            <img height={300} src={movie.image} />
          </div>
          <div>
            <span>Title: </span>
            <span>{movie.title}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{movie.description}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.genre}</span>
          </div>
          <div>
            <span>Director: </span>
            <span>{movie.director}</span>
          </div>
          {/* <div>
            <span>Featured: </span>
            <span>{movie.featured}</span>
          </div> */}
          <button onClick={onBackClick}> Back </button>
        </div>
      );
    };
    MovieView.propTypes = {
        movie: PropTypes.shape({
            _id: PropTypes.string.isRequired, // Changed from id to _id
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired,
            director: PropTypes.string.isRequired,
        }).isRequired,
        onBackClick: PropTypes.func.isRequired,
    };