import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.Genre.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.Genre.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.Director.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
              Death: movie.Director.Death
            }
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
      <Row className="justify-content-center pt-5">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="m-5 text-light">
                    <h1 className="text-center mb-5"><span className="h6 fst-italic">Welcome to<br /></span> myFlix</h1>
                    <h2>Sign Up</h2>
                    <SignupView />
                  </Col>
                )}
              </>
            } />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="m-5 text-light">
                    <h1 className="text-center mb-5"><span className="h6 fst-italic">Welcome to<br /></span> myFlix</h1>
                    <h2>Login</h2>
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                  </Col>
                )}
              </>
            } />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>There is no movie to display!</div>
                ) : (
                  <Col md={10}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            } />
          <Route
            path="/"
            element={
              <>{!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <div>There is no movie to display!</div>
              ) : searchTerm && filteredMovies.length > 0 ? (
                <>
                  <Col xs={11} md={6} className="pt-5">
                    <Form>
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="mr-sm-2"
                        onChange={handleSearch}
                        value={searchTerm}
                      />
                    </Form>
                  </Col>
                  <Col md={12} className="pt-5"></Col>
                  {filteredMovies.map((movie) => (
                    <Col className="mb-4" key={movie._id} xs={11} sm={6} md={4} lg={3}>
                      <MovieCard movieData={movie} user={user} onFavoritesUpdate={(user) => { setUser(user) }} />
                    </Col>
                  ))}
                </>
              ) : (
                <>
                  <Col xs={11} md={6} className="pt-5">
                    <Form>
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="mr-sm-2"
                        onChange={handleSearch}
                        value={searchTerm}
                      />
                    </Form>
                  </Col>
                  <Col md={12} className="pt-5"></Col>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie._id} xs={11} sm={6} md={4} lg={3}>
                      <MovieCard movieData={movie} user={user} onFavoritesUpdate={(user) => { setUser(user) }} />
                    </Col>
                  ))}
                </>
              )}
              </>
            } />
          <Route path="/profile" element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={12} className="pt-5 text-light">
                  <ProfileView user={user} movies={movies} onAccountUpdate={(user) => { setUser(user) }} onFavoritesUpdate={(user) => { setUser(user) }} />
                </Col>
              )}
            </>} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};