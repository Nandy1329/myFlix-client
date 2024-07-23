import React from 'react';
import { useParams } from 'react-router-dom'; // Corrected import for useParams
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

export const MovieView = ({ movies, addFav, removeFav, user }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);

    // Check if the movie exists
    if (!movie) {
        return <div>Loading...</div>;
    }
    const { Title, Description, Genre, Director, Year, ImagePath } = movie;

    const isFavorite = user && user.FavoriteMovies && user.FavoriteMovies.includes(movie._id);

    return (
        <Row className="my-5 justify-content-md-center">
            <Col md={7} className="col-12">
                <img src={ImagePath} alt="movie cover" className="mx-auto w-100" />
            </Col>
            <Col md={5} className="col-12">
                <div className="my-1">
                    <span className="h1">{Title}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Description: </span>
                    <span>{Description}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Director: </span>
                    <span>{Director ? Director.Name : 'N/A'}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Genre: </span>
                    <span>{Genre ? Genre.Name : 'N/A'}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Year: </span>
                    <span>{Year}</span>
                </div>
                {isFavorite ? (
                    <Button variant="outline-danger" className="my-2 me-2" onClick={() => {
                        console.log(`Removing movie with ID ${movie._id} from favorites`);
                        removeFav(movie._id);
                    }}>
                        Remove from Favorites
                    </Button>
                ) : (
                    <Button variant="outline-success" className="my-2 me-2" onClick={() => {
                        console.log(`Adding movie with ID ${movie._id} to favorites`);
                        addFav(movie._id);
                    }}>
                        Add to Favorites
                    </Button>
                )}
                <Link to={`/`}>
                    <Button variant="outline-secondary" className="my-2">Back</Button>
                </Link>
            </Col>
        </Row>
    );
};