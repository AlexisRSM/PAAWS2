// Card with minimal info on the animal, such as name, species, approximate age, gender

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//Added by-RM
//I think it will work forever now
//Receives child to render
function AnimalCard({ animal }) {
  console.log("I am animal object in regular card", animal)

  // Function to find the first valid image URL because if theres no image there is problems !
  const findValidImageUrl = (images) => {
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        if (images[i].image_url) {
          return images[i].image_url;
        }
      }
    }
    // Fallback if no valid image URL is found- I mean melhor prevenir de que remediar
    return "https://cdn.britannica.com/86/166986-050-4CEFE5DE/cute-kitten-and-puppy-outdoors-in-grass.jpg";
  };
  const imageUrl = findValidImageUrl(animal.images);

  return (
    <Card>
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={animal.name}
        style={{ width: "100%", height: "25vh", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{animal.name || "Unknown Animal"}</Card.Title>
        <Card.Text>
          Species: {animal.species || "Unknown"} <br />
          Gender: {animal.gender || "Unknown"} <br />
          Age: {animal.life_stage || "Unknown"} <br />
        </Card.Text>
        <Link to={`/animalpage/${animal.id}`} state={{ animal }} > {/* Added Satte to link to pass prop animal */}
          <Button className='primaryButton'>
            More
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default AnimalCard;