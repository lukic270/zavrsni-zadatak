import React from "react";
import { Card } from "react-bootstrap";

export default function Gallery({ id, title, description, image, createdAt, author }) {

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Author: {author}</Card.Text>
        <Card.Text>Created At: {createdAt}</Card.Text>
      </Card.Body>
    </Card>
  );
}
