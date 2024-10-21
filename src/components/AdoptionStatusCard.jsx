import React from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdoptionStatusCard = ({ adoption, onApprove, onReject, onViewForm, isUpdating }) => {
  // Function to determine the card's background color based on status
  const getCardStyle = () => {
    switch (adoption.adoption_status) {
      case 'Approved':
        return { backgroundColor: 'rgb(107,255,184, 0.3)' }; // Light green for approved
      case 'Rejected':
        return { backgroundColor: 'rgb(255,193,187, 0.5)' }; // Light red for rejected
      case 'Pending':
      default:
        return { backgroundColor: 'rgb(54,56,46, 0.1)' }; // Light grey for pending or default
    }
  };

  return (
    <Card className='card' style={{ marginBottom: '1rem', ...getCardStyle() }}>
      <Card.Img
        variant="top"
        src={adoption.animal.images.length > 0 ? adoption.animal.images[0].image_url : "https://cdn.britannica.com/86/166986-050-4CEFE5DE/cute-kitten-and-puppy-outdoors-in-grass.jpg"}
        alt={adoption.animal.name || "Animal Image"}
        style={{ width: "100%", height: "25vh", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{adoption.animal.name || "Unknown Animal"}</Card.Title>
        <Card.Text>
          ID: {adoption.animal.id || "Unknown"}
        </Card.Text>
        <Card.Text>Status: {adoption.adoption_status}</Card.Text>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className='primaryButton'
            onClick={onApprove}
            disabled={isUpdating}  // Disable the button when updating
          >
            {isUpdating ? <Spinner as="span" animation="border" size="sm" /> : <i className="fa-solid fa-check" />}
          </Button>
          <Button
            className='secondaryButton'
            onClick={onReject}
            disabled={isUpdating}  // Disable the button when updating
          >
            {isUpdating ? <Spinner as="span" animation="border" size="sm" /> : <i className="fa-solid fa-x" />}
          </Button>
          <Link to={`/adoptionform_adminview/${adoption.id}`} >
            <Button className='tertiaryButton' onClick={onViewForm}>
              <i className="fa-solid fa-plus" />
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdoptionStatusCard;
