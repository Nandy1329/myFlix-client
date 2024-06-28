import { Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";

export const SearchBar = ({ movies, handleMovieSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredMovies = movies.filter((movie) =>
      movie.Title.toUpperCase().includes(search.toUpperCase())
    );
    handleMovieSearch(filteredMovies); // Call the callback function with the filtered movies
  };

  return (
    <Row>
      <Form onSubmit={handleSearch}>
        <Form.Control
          className="bg-input"
          type="search"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          
          aria-label="Search"
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
    </Row>
  );
};