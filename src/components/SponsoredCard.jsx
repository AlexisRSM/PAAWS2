// Highlight sponsered animals (golds)

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function SponsoredCard({ pet }) {
  console.log("I am pet object prop in sponsored card component", pet)
  return (
    <div>
      <Card className="card">
        <Card.Img
          variant="top"
          src={(pet.animal.images && pet.animal.images[0] && pet.animal.images[0].image_url) || 'https://cdn.britannica.com/86/166986-050-4CEFE5DE/cute-kitten-and-puppy-outdoors-in-grass.jpg'}
          alt={pet.animal.name} 
          style={{  width: "100%", height: "25vh", objectFit: "cover"}}
        />
        <Card.Body>
          <Card.Title>{pet.animal.name || 'Adorable little fluffball'}</Card.Title>
          <Card.Text>
            Contributed: {pet.total_sponsorship_amount}€ total
          </Card.Text>
          <Link to={`/animalpage/${pet.animal.id} `} state={{ pet }}>
            <Button className='primaryButton'>
              More
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SponsoredCard;