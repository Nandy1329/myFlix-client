import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

  return( 
    <Row className='justify-content-md-center'>
    {!user ? (
      <Col md={5}>
        <LoginView onLoggedIn={(user, token) => 
        
        {
        setUser(user);
        setToken(token);
        }}
         />
         or create a new user account
          <SignupView />
      </Col>
  
      ): selectedMovie ? (
            <Col>
            <MovieView 
                movieData = {selectedMovie}
                onBackClick = {() => setSelectedMovie (null)}
            />
            </Col>
        ): movies.length === 0 ? (
            <div>There are no movies!</div>
        ): (
            <>{movies.map((movie) => (
            <Col key ={movie._id} md={4} className='mb-5'>
             <MovieCard 
                movieData = {movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie (newSelectedMovie);
                }}/>
            </Col>
        ))} 
        <button onClick={() => {setUser(null); setToken(null); localStorage.clear();}}>Logout</button>
        </>
    )} 
    </Row>
)};