export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
        
            <h2>{movie.Title}</h2>
            <img src={movie.ImagePath} alt="movie cover"/>
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
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};