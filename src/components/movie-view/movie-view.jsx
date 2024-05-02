import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const MovieView = (movies) => {
    
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
        console.log(movie);
    }

    return (
        <div>
            <img src={movie.image} alt={movie.title} className='w-100' />
            <div>
                <h2>{movie.title}</h2>
                <button onClick={() => handleAddToFavorites(movie)}>Add to Favorites</button>
            </div>
            <Link to={'/'}>
                <button className='back-button' style={{ cursor: 'pointer' }}>Back</button>
            </Link>
        </div>
    );


export default MovieView;