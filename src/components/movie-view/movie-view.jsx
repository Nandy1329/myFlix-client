export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <button onClick={onBackClick}>Back</button>
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
                <span>{movie.Director}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
        </div>
    );
};