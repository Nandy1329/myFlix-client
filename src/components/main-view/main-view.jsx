import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://cine-verse-b8832aa84c3e.herokuapp.com/movies', { headers: { Authorization: 'Bearer${token}' } })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((doc) => {
          return {
            _id: doc.key,
            title: doc.Title,
            description: doc.Description
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <Row className='justify-content-md-center'>
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
          />
          or Sign Up as a New User
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col>
          <MovieView
            movieData={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>There are no movies!</div>
      ) : (
        <>{movies.map((movie) => (
          <Col key={movie._id} md={4} className='mb-5'>
            <MovieCard
              movieData={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }} />
          </Col>
        ))}
          <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </>
      )}
    </Row>
  )
};