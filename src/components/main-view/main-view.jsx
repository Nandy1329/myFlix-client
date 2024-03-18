import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser:null);
  const [token, setToken] = useState(storedToken? storedToken:null);
  const [movies, setMovies] = useState ([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


useEffect(() => {
  if (!token) {
      return;
  }
    // fetch movies
    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie.id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
            ImageUrl: movie.ImageUrl
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
        />
or  
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      return movie.id !== selectedMovie.id &&
        movie.genre.some(genre => selectedMovie.genre.includes(genre));
    })
    return (
        <>
          <MovieView key={movies.id} movie={selectedMovie} onBackClick={() => 
      {setSelectedMovie(null); }} />
      <hr />
      <h2>Similar Movies</h2>
      {similarMovies.map((movie) => (<MovieCard key={movie.id} movie={movie}
       onMovieClick={(setSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }} /> ))}
      </>
      );
    }

      if (movies.length === 0) {
        return <div>Loading movies...</div>;
}
return (
  <div>
    {movies.map((movie) => (
      <MovieCard
      key={movie.id}
      movie={movie}
      onMovieClick={(newSelectedMovie) => {
        setSelectedMovie(newSelectedMovie);
      }}
      />
    ))}

    <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>

  </div>
);
};