import React, { useState } from "react";
import useGalleries from "../hooks/useGalleries";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../components/useAuth";

const GalleriesPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const { galleries, metadata } = useGalleries(page, searchInput);

  const { user, token } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(searchInput);
    setPage(1); 
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Form onSubmit={handleSearch} className="mb-3">
        <Form.Group controlId="searchInput">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {galleries?.map((gallery, index) => (
          <div key={index} className="col">
            <Card>
              <Card.Img variant="top" src={gallery.images[0]?.url} />
              <Card.Body>
                <Card.Title>{gallery.title}</Card.Title>
                <Card.Text>{gallery.description}</Card.Text>
                <Card.Text>
                  {gallery.user?.firstName} {gallery.user?.lastName} 
                </Card.Text>
                <Link to={`/galleries/${gallery.id}`}>
                  <Button variant="primary">View Gallery</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {galleries.length < metadata.total && (
  <Button onClick={handleLoadMore}>Load More</Button>
)}
    </div>
  );
};

export default GalleriesPage;
