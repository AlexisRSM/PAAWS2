import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


//either I make a route to get single image or we try to pass single pet image
//i think i will make get single animal by id and put photos in a state (only need photos)
// i do not think this is a good practice because each card will make a fetch
//maybeI will alter api adfoption endpoint to get images

function AdoptionCard({ process }) {
  console.log("I am adoption card prop process:", process);

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'approved';
      case 'pending':
        return 'pending';
      case 'rejected':
        return 'rejected';
      default:
        return 'pending';
    }
  };
  let animal = process.animal

  return (
    <Card className={`card ${getStatusVariant(process.adoption_status)}`} text={getStatusVariant(process.adoption_status) === 'pending' ? 'dark' : 'white'}>
      <Card.Img variant="top"
      src={process.animal.images[0].image_url || "https://d.newsweek.com/en/full/1898130/dog-cat-under-sheet.jpg"}
      alt={process.animal_name || "Adopted Pet"} 
      style={{  width: "100%", height: "25vh", objectFit: "cover"}}
      />
      <Card.Body>
        <Card.Title>{process.animal.name || "Sweet baby angel"}</Card.Title>
        <Card.Text>
          Adoption status: <span className=""><strong>{process.adoption_status}</strong></span>
        </Card.Text>
        <Button className='primaryButton'>
          <Link to={`/animalpage/${process.animal_id}`} state={{ animal }} style={{ color: "black", textDecoration: "none" }}>
            More
          </Link>
        </Button> {/* should this be more about animal ? if so i am going to do it  -RM*/}
      </Card.Body>
    </Card>
  );
}

export default AdoptionCard;
