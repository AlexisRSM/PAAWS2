import React, { useState } from 'react';
import { useAPI } from '../Context/Context';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
//maybe change input text to center later
//its working missing to lock routes 
import Swal from 'sweetalert2';


function AdminDelete() {
  const [animalId, setAnimalId] = useState('');
  const [animalData, setAnimalData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getAnimal, deleteAnimal } = useAPI();

  const handleFetchAnimal = async () => {
    if (animalId) {
      try {
        const data = await getAnimal(animalId);
        //kiling bugs
        console.log(data)
        setAnimalData(data);
        setError('');
      } catch (error) {
        setAnimalData(null);
        setError(`Error fetching animal with ID ${animalId}: ${error.message} Please Try Again`);
      }
    }
  };

  const handleDeleteAnimal = async () => {
    if (animalId) {
      try {
        await deleteAnimal(animalId);
        setAnimalData(null);
        setError('');
        /* alert(`Animal with ID ${animalId} deleted successfully.`); */
        Swal.fire({
          title: "Animal Deleted!",
          text: "Animal was Sucessfully deleted from database!",
          icon: "sucess",
          confirmButtonColor: '#2AD897',
        });
      } catch (error) {
        setError(`Error deleting animal with ID ${animalId}: ${error.message}`);
        Swal.fire({
          title: "ERROR!",
          text: `Animal Refused to leave the database please try again! ERROR CODE:${error.message}`,
          icon: "error",
          confirmButtonColor: '#2AD897',
        });
      }
    }
  };

  const navigateToEdit = () => {
    if (animalData) {
      navigate('/adminedit', { state: { animalData } });
    } else {
      /* alert('No animal data available. Please fetch an animal first.'); */
      Swal.fire({
        title: "ERROR!",
        text: `No animal data available. Please fetch an animal first.`,
        icon: "error",
        confirmButtonColor: '#2AD897',
      });
    }
  };

  return (
    <div className="adminDeleteContainer">
      <div className='container'>
        <div className='row justify-content-center py-3'>
          <div className='col-md-6'>
            <input
              type="number"
              className='form-control mb-2'
              placeholder="Enter animal ID"
              value={animalId}
              onChange={(e) => setAnimalId(e.target.value)}
            />
            <Button
              className='primaryButton w-100'
              onClick={handleFetchAnimal}
            >
              Search
            </Button>
          </div>
        </div>

        {animalData && (
          <div className='row justify-content-center py-3'>
            <div className='col-md-6'>
              <Carousel className='d-flex justify-content-center'>
                {animalData.images.map((image, index) => (
                  <Carousel.Item key={image.id}>
                    <img
                      className="d-block w-100"
                      src={image.image_url}
                      alt={`Image ${index + 1}`}
                      style={{ height: '300px', objectFit: 'contain' }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

              <div className="animalData mt-3">
                <div className="animalDataField">
                  <strong>ID:</strong> {animalData.id}
                </div>
                <div className="animalDataField">
                  <strong>Name:</strong> {animalData.name}
                </div>
                <div className="animalDataField">
                  <strong>Species:</strong> {animalData.species}
                </div>
                <div className="animalDataField">
                  <strong>Gender:</strong> {animalData.gender}
                </div>
                <div className="animalDataField">
                  <strong>Life stage:</strong> {animalData.life_stage}
                </div>
                <div className="animalDataField">
                  <strong>Weight:</strong> {animalData.weight}
                </div>
                <div className="animalDataField">
                  <strong>Breed:</strong> {animalData.breed}
                </div>
                <div className="animalDataField">
                  <strong>Location:</strong> {animalData.location}
                </div>
                <div className="animalDataField">
                  <strong>Known illnesses:</strong> {animalData.known_illness || 'NA'}
                </div>
                <div className="animalDataField">
                  <strong>Adoption status:</strong> {animalData.adoption_status || 'NA'}
                </div>
                <div className="animalDataField">
                  <strong>Description:</strong> {animalData.description || 'NA'}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='row justify-content-center'>
          <div className='col-md-6 d-flex justify-content-between' style={{ gap: '1rem' }}>
            <Button
              className='secondaryButton'
              onClick={handleDeleteAnimal}
              style={{ flex: '1' }}
            >
              Delete animal
            </Button>
            <Button
              className='tertiaryButton'
              onClick={navigateToEdit}
              style={{ flex: '1' }}
            >
              Want to Edit Instead?
            </Button>
          </div>
        </div>

        {/* Separate container for centered Return button */}
        <div className='row justify-content-center mt-4'>
          <div className='col-md-6 text-center'>
            <Button 
              href="/adminpage" 
              className='tertiaryButton'
            >
              Return
            </Button>
          </div>
        </div>

        {error && <p className='text-danger text-center'>{error}</p>}
      </div>
    </div>
  );
}

export default AdminDelete;