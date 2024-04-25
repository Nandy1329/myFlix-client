import React from 'react'
import Row  from 'react-bootstrap/Row'
import Col  from 'react-bootstrap/Col'
import { MovieCard } from '../movie-card/movie-card'
import { Link } from 'react-router-dom'

export const FavoriteMovies = ({user, favoriteMovies}) => {

    return (
      <Row>
       <h3>My favorite movies</h3>
       {favoriteMovies.map((movie) =>{
       return (        
         <Col 
         key={movie.id} md={4}>
         {/* src={movie.Img} */}
         <Link to={`/movies/${movie._id}`} />
         <Button variant="secondary" onClick= { () => 
           removeFav(movie._id)}>Remove</Button>          
           <MovieCard
             movie={movie}
           />
         </Col>
       )} )
     }
     </Row>
     )
   }