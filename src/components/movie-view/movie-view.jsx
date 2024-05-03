import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movie }) => {
    const { movieId } = useParams();

    const movie = movies.find((movie) => movie._id === movieId);


  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt="movie cover" className="w-100" />
      </div>
      <div>
         <span> Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span> Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span> Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span> Year: </span>
          <span>{movie.Year}</span>
        </div>
        <Link to={'/'}>
                <button
                    className='back-button'
                    style={{ cursor: 'pointer' }}
                >
                    Back
                </button>
            </Link>
        </div>
    );
};
