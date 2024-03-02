import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  
  useEffect(() => {
    if (!token) return;

    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })

      .then(response => response.json())
      .then((data) => {
    // Assign the result to the state
    const moviesFromAPI = data.doc.map((doc) => {
      return {
      _id: movies._id,
      Title: movies.Title,
      Description: movies.Description,
      Genre: {
        Name: movies.Genre ? movies.Genre.Name : 'N/A' // Check if movie.Genre is not null or undefined
      },
      Director: {
        Name: movies.Director ? movies.Director.Name : 'N/A' // Check if movie.Director is not null or undefined
      }
      };
    });
    setMovies(moviesFromAPI);
    });
  }, [token]);


 if (!user) {
      return (
      <>
      <LoginView  onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }
      } />
      </>     
      );

    // Show Movie Info (MovieView) with similar Movies 
    if (selectedMovie) {
      let similarMovies = movies.filter((movie) => 
      {
        return movie._id !== selectedMovie._id && movie.Genre.Name === selectedMovie.Genre.Name;
      });
    }
    if(similarMovies.length === 0) {
      return (
        <>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /><br />
          <h2>Similar Movies</h2>
          <p>There are no similar movies.</p>
        </>
      );
    } else {
      return (
        <>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /><br />
          <h2>Similar Movies</h2>
          {similarMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </>
      );
    }
  }

  if (movies.length === 0) {
    return <div>
      <p>The list is empty!</p>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();  }}>Logout</button>
    </div>
  );
};  
// MainView.propTypes = {
//   movies: PropTypes.arrayOf(
//     PropTypes.shape({
//       Title: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//       Genre: PropTypes.shape({
//         Name: PropTypes.string.isRequired,
//       }),
//       Director: PropTypes.shape({
//         Name: PropTypes.string.isRequired,

//       }),
//     })
//   ).isRequired,
//   selectedMovie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//   }),
//  