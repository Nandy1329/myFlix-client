import PropTypes from "prop-types";


export const MovieView = ({ movie }) => {
    if (!movie) return null;

    const { title, director, description, genre, image } = movie;

    return (
        <>
            <div className="movie-image">
                <img src={image} width={500} className="image" alt={title} />
            </div>
            <div className="movie-title">
                <span className="movieHeader">Title: </span>
                <span>{title}</span>
            </div>
            <div>
                <span className="movieHeader">Director: </span>
                <span>{director}</span>
            </div>
            <div>
                <span className="movieHeader">Description: </span>
                <span>{description}</span>
            </div>
            <div>
                <span className="movieHeader">Genre: </span>
                <span>{genre}</span>
            </div>
        </>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birthday: PropTypes.string.isRequired,
        }).isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
    }).isRequired,
};
