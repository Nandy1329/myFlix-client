import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <Card className='h-100'>
            <Card.Body>
                <Card.Title>{movieData.title}</Card.Title>
                <Button onClick={() => onMovieClick(movieData)} variant="primary" className='back-button'> Open </Button>
            </Card.Body>
        </Card>

    )
};

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};