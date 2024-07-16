import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Figure, Button, Card } from "react-bootstrap";

function FavoriteMovies({ favoriteMovieList }) {
  const removeFav = (id) => {
    let token = localStorage.getItem("token");
    let url = 'https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/' + localStorage.getItem('user') + '/movies/' + id;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
  return (
    <Card>
    <Card.Body>
    <Row>
        {favoriteMovieList.map((ImagePath, Title, _id) => {
          return (
            <Col xs={12} md={6} lg={3} key={_id}>
              <Figure>
                <Link to={`/movies/${movies._id}`}>
                  <Figure.Image
                    src={ImagePath}
                    alt={Title}
                  />

                  <Figure.Caption>
                    {Title}
                  </Figure.Caption>
                </Link>
              </Figure>
              <button variant="secondary" onClick={() => removeFav(_id)}>
                Remove from Favorites
              </button>
            </Col>
          );
        }
        )}
      </Row>
    </Card.Body>
      <Row>
        <Col xs={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>
    </Card>
  );
}



