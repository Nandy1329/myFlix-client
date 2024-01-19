import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
    const [movies, setMovies] = useState([
        // Your array of movie objects goes here
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    if(selectedMovie){
        return <MovieView movieData={selectedMovie} onBackClick={()=>{setSelectedMovie(null)}} />
    }

    if(movies.length === 0){
        return <div>The list is empty</div>
    }
    return(
        <div>
            {movies.map((movie)=>(
                <MovieCard key = {movie.movieId} movieData = {movie} onMovieClick ={ (newSelectedMovie)=>{
                    setSelectedMovie(newSelectedMovie);
                }} />
            ))}
        </div>
    )
};

export {MainView};