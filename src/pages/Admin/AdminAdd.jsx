// page for adding animals + changing adoption status of animals
// plus edit
// plus delete

// name, species, gender, age, location, weight, known illnesses, description, race

//Added user feedback and spinner if the user as missing field before submit -RM

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
//Added by RM
import { useAPI } from '../Context/Context';
import React, { useState, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';


function AdminAdd() {
  const { addAnimal } = useAPI();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    gender: '',
    lifeStage: '',
    weight: '',
    breed: '',
    location: '',
    knownIllness: '',
    description: '',
  });
  const [images, setImages] = useState([]);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);  // New loading state
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //we can add more to make them required or less (if database allows it ) -RM
    if (formData.name && formData.species && formData.gender && formData.description && formData.location && formData.knownIllness && formData.lifeStage) {
      setLoading(true);  // Start loading
      try {
        const response = await addAnimal(formData, images);
        /* console.log(response);
        alert('Animal successfully added!'); */
        Swal.fire({
          title: "Sucess!",
          text: "Pet sucessfully added to database!",
          icon: "success"
        });

        // Reset form state
        setFormData({
          name: '',
          species: '',
          gender: '',
          lifeStage: '',
          weight: '',
          breed: '',
          location: '',
          knownIllness: '',
          description: '',
        });
        setImages([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setValidated(false);
      } catch (error) {
        /* alert(`Failed to add the Pet: ${error.message} Your Session Expired!`); */
        Swal.fire({
          title: "Error!",
          text: "You session expired please log in!",
          icon: "warning"
        });
      } finally {
        setLoading(false);  // End loading
      }
    } else {
      setValidated(true);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className='adminForm'>
      <Form.Group controlId="animalName" className='m-4'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          isInvalid={validated && !formData.name}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="animalSpecies" className='m-4'>
        <Form.Label>Species</Form.Label>
        <div>
          <Form.Check
            inline
            required
            label="Cat"
            name="species"
            type="radio"
            id="species-cat"
            value="cat"
            onChange={handleRadioChange}
            checked={formData.species === 'cat'}
            isInvalid={validated && !formData.species}
          />
          <Form.Check
            inline
            required
            label="Dog"
            name="species"
            type="radio"
            id="species-dog"
            value="dog"
            onChange={handleRadioChange}
            checked={formData.species === 'dog'}
            isInvalid={validated && !formData.species}
          />
        </div>
        <Form.Control.Feedback type="invalid">
          Please select a species.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="animalGender" className='m-4'>
        <Form.Label>Gender</Form.Label>
        <div>
          <Form.Check
            inline
            required
            label="Female"
            name="gender"
            type="radio"
            id="gender-female"
            value="female"
            onChange={handleRadioChange}
            checked={formData.gender === 'female'}
            isInvalid={validated && !formData.gender}
          />
          <Form.Check
            inline
            required
            label="Male"
            name="gender"
            type="radio"
            id="gender-male"
            value="male"
            onChange={handleRadioChange}
            checked={formData.gender === 'male'}
            isInvalid={validated && !formData.gender}
          />
        </div>
        <Form.Control.Feedback type="invalid">
          Please select a gender.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="animalLifeStage" className='m-4'>
        <Form.Label>Life Stage</Form.Label>
        <div>
          <Form.Check
            inline
            label="Baby"
            name="lifeStage"
            type="radio"
            id="lifeStage-baby"
            value="baby"
            onChange={handleRadioChange}
            checked={formData.lifeStage === 'baby'}
          />
          <Form.Check
            inline
            label="Junior"
            name="lifeStage"
            type="radio"
            id="lifeStage-junior"
            value="junior"
            onChange={handleRadioChange}
            checked={formData.lifeStage === 'junior'}
          />
          <Form.Check
            inline
            label="Adult"
            name="lifeStage"
            type="radio"
            id="lifeStage-adult"
            value="adult"
            onChange={handleRadioChange}
            checked={formData.lifeStage === 'adult'}
          />
          <Form.Check
            inline
            label="Senior"
            name="lifeStage"
            type="radio"
            id="lifeStage-senior"
            value="senior"
            onChange={handleRadioChange}
            checked={formData.lifeStage === 'senior'}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="animalWeight" className='m-4'>
        <Form.Label>Weight (kg)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter weight in kg"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="animalBreed" className='m-4'>
        <Form.Label>Breed</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter breed"
          name="breed"
          value={formData.breed}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="animalLocation" className='m-4'>
        <Form.Label>Location</Form.Label>
        <Form.Control
          required
          as="select"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          isInvalid={validated && !formData.location}
        >
          <option value="">Choose a location</option>
          <option value="Aveiro">Aveiro</option>
          <option value="Beja">Beja</option>
          <option value="Braga">Braga</option>
          <option value="Bragança">Bragança</option>
          <option value="Castelo Branco">Castelo Branco</option>
          <option value="Coimbra">Coimbra</option>
          <option value="Évora">Évora</option>
          <option value="Faro">Faro</option>
          <option value="Guarda">Guarda</option>
          <option value="Leiria">Leiria</option>
          <option value="Lisboa">Lisboa</option>
          <option value="Portalegre">Portalegre</option>
          <option value="Porto">Porto</option>
          <option value="Santarém">Santarém</option>
          <option value="Setúbal">Setúbal</option>
          <option value="Viana do Castelo">Viana do Castelo</option>
          <option value="Vila Real">Vila Real</option>
          <option value="Viseu">Viseu</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please select a location.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="animalKnownIllnesses" className='m-4'>
        <Form.Label>Known Illnesses</Form.Label>
        <div>
          <Form.Check
            inline
            required
            label="Yes"
            name="knownIllness"
            type="radio"
            id="illness-yes"
            value="yes"
            onChange={handleRadioChange}
            checked={formData.knownIllness === 'yes'}
            isInvalid={validated && !formData.knownIllness}
          />
          <Form.Check
            inline
            required
            label="No"
            name="knownIllness"
            type="radio"
            id="illness-no"
            value="no"
            onChange={handleRadioChange}
            checked={formData.knownIllness === 'no'}
            isInvalid={validated && !formData.knownIllness}
          />
        </div>
        <Form.Control.Feedback type="invalid">
          Please select if the animal has known illnesses.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="animalDescription" className='m-4'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter description"
          isInvalid={validated && !formData.description}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a description.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="animalImage" className='m-4'>
        <Form.Label>Add Images</Form.Label>
        <Form.Control
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Form.Group>

      <Button className='m-2 primaryButton' type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            /> Loading...
          </>
        ) : (
          'Submit'
        )}
      </Button>
      <Button href='/adminpage' className="m-2 tertiaryButton" disabled={loading}>
        Return
      </Button>
    </Form>
  );
}

export default AdminAdd;