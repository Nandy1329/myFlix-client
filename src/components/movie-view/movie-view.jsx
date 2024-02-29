import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <div>{movie.title}</div>
        <div>{movie.description}</div>
        <div>{movie.genre}</div>
        <div>{movie.director}</div>
      </div>
      <button onClick={() => { onBackClick() }}>Back</button>
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
