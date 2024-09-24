import React from 'react';
import { Card } from 'react-bootstrap';
import './App.css'; // Import the custom CSS for card styling

function Cards({ title, imgSrc }) {
  return (
    <Card className="custom-card">
      <Card.Img variant="top" src={imgSrc} className="card-image" />
      <Card.Body className="text-center">
        <Card.Title className="card-title">{title}</Card.Title>
       
      </Card.Body>
    </Card>
  );
}

export default Cards;
