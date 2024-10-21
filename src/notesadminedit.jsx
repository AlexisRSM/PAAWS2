/* //working with problems maybe due to passing value to the form from navigate, i have to find a way to solve
//maybe fetch by animal id after deleting image would be easier






import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { useAPI } from '../Context/Context';
import Spinner from 'react-bootstrap/Spinner';

function AdminEdit() {
    const location = useLocation();
    const { animalData } = location.state || {};
    console.log("Received animalData:", animalData);

    const { deleteImage, updateAnimalData } = useAPI();

    const [loadingImages, setLoadingImages] = useState({});
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        species: '',
        gender: '',
        life_stage: '',
        weight: '',
        breed: '',
        location: '',
        known_illness: '',
        description: '',
        images: [],
    });

    useEffect(() => {
        if (animalData) {
            setFormData({
                id: animalData.id || '',
                name: animalData.name || '',
                species: animalData.species || '',
                gender: animalData.gender || '',
                life_stage: animalData.life_stage || '',
                weight: animalData.weight || '',
                breed: animalData.breed || '',
                location: animalData.location || '',
                known_illness: animalData.known_illness || '',
                description: animalData.description || '',
                images: animalData.images || [],
            });
        }
    }, [animalData]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleImageDelete = async (imageId) => {
        setLoadingImages((prev) => ({ ...prev, [imageId]: true }));
        try {
            // Attempt to delete the image using the API
            console.log(`Attempting to delete image with ID: ${imageId}`);
            const deleteResponse = await deleteImage(imageId);

            console.log(`API delete response for image ID ${imageId}:`, deleteResponse);

            // If the delete is successful, update the images in the formData
            const updatedImages = formData.images.filter((image) => image.id !== imageId);

            setFormData((prevData) => ({
                ...prevData,
                images: updatedImages,
            }));

            console.log(`Updated images after deletion:`, updatedImages);

            // Update the animal data to persist the change
            const updateResponse = await updateAnimalData(formData.id, { ...formData, images: updatedImages });

            console.log(`API update response after image deletion:`, updateResponse);

            console.log(`Successfully deleted image with ID: ${imageId}`);
        } catch (error) {
            // Handle any errors that occur during the delete operation
            console.error(`Failed to delete image with ID: ${imageId}`, error);
            alert(`Failed to delete image with ID: ${imageId}. Please try again.`);
        } finally {
            setLoadingImages((prev) => ({ ...prev, [imageId]: false }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAnimalData(formData.id, formData);
            history.push('/admin'); // Redirect to another page after submission
        } catch (error) {
            console.error('Failed to update animal data', error);
            alert('Failed to update animal data. Please try again.');
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="m-3" controlId="animalId" >
                    <Form.Label>ID </Form.Label>
                    < Form.Control
                        type="text"
                        name="id"
                        value={formData.id}
                        placeholder="Enter ID"
                        readOnly
                    />
                </Form.Group>

                < Form.Group className="m-3" controlId="animalName" >
                    <Form.Label>Name </Form.Label>
                    < Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                    />
                </Form.Group>

                {/* Other form fields */}

{
    formData.images.length > 0 && (
        <Form.Group className="m-3" controlId="animalImages" >
            <Form.Label>Current Images </Form.Label>
            < Carousel interval={null} >
                {
                    formData.images.map((image, index) => (
                        <Carousel.Item key={index} >
                            <img
                                className="d-block w-100"
                                src={image.image_url}
                                alt={`Animal Image ${index + 1}`}
                                style={{ height: '300px', objectFit: 'contain' }
                                }
                            />
                            < Carousel.Caption >
                                <Button
                                    variant="danger"
                                    onClick={() => handleImageDelete(image.id)
                                    }
                                    disabled={loadingImages[image.id]} // Disable only the button for the specific image being deleted
                                >
                                    {
                                        loadingImages[image.id] ? (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria- hidden="true"
                                            />
                                        ) : (
                                            'Delete Image'
                                        )}
                                </Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
            </Carousel>
        </Form.Group>
    )
}

<Button className='m-2' variant="primary" type="submit" >
    Submit
</Button>
            </Form >
        </div >
    );
}

export default AdminEdit;
///Second
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { useAPI } from '../Context/Context';
import Spinner from 'react-bootstrap/Spinner';

function AdminEdit() {
    const location = useLocation();
    const { animalData } = location.state || {};
    //Killing bugs
    console.log("Received animalData:", animalData);

    const { deleteImage } = useAPI();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        species: '',
        gender: '',
        life_stage: '',
        weight: '',
        breed: '',
        location: '',
        known_illness: '',
        description: '',
        images: [], // armazenar images carrosel
    });

    useEffect(() => {
        if (animalData) {
            setFormData({
                id: animalData.id || '',
                name: animalData.name || '',
                species: animalData.species || '',
                gender: animalData.gender || '',
                life_stage: animalData.life_stage || '',
                weight: animalData.weight || '',
                breed: animalData.breed || '',
                location: animalData.location || '',
                known_illness: animalData.known_illness || '',
                description: animalData.description || '',
                images: animalData.images || [],
            });
        }
    }, [animalData]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleImageDelete = async (imageId) => {
        setIsLoading(true);
        try {
            // Attempt to delete the image using the API
            await deleteImage(imageId);

            // If the delete is successful, update the images in the formData
            const updatedImages = formData.images.filter((image) => image.id !== imageId);

            setFormData((prevData) => ({
                ...prevData,
                images: updatedImages,
            }));

            // Update the animal data to persist the change
            await updateAnimalData(formData.id, { ...formData, images: updatedImages });

            console.log(`Deleted image with ID: ${imageId}`);
        } catch (error) {
            // Handle any errors that occur during the delete operation
            console.error(`Failed to delete image with ID: ${imageId}`, error);
            alert(`Failed to delete image with ID: ${imageId}. Please try again.`);
        } finally {
            // Ensure loading state is turned off regardless of success or failure
            setIsLoading(false);
        }
    };


    //Aqui vai ser para fazer o put para atulizar os dados do animal
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the animal data
            await updateAnimalData(formData.id, formData);
            history.push('/admin'); // Redirect to another page after submission
        } catch (error) {
            console.error('Failed to update animal data', error);
            alert('Failed to update animal data. Please try again.');
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="m-3" controlId="animalId" >
                    <Form.Label>ID </Form.Label>
                    < Form.Control
                        type="text"
                        name="id"
                        value={formData.id}
                        placeholder="Enter ID"
                        readOnly
                    />
                </Form.Group>

                < Form.Group className="m-3" controlId="animalName" >
                    <Form.Label>Name </Form.Label>
                    < Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                    />
                </Form.Group>

                < Form.Group className="m-3" controlId="animalSpecies" >
                    <Form.Label>Species </Form.Label>
                    < div className="mb-3" >
                        <Form.Check
                            inline
                            label="Cat"
                            name="species"
                            type="radio"
                            value="cat"
                            checked={formData.species === 'cat'}
                            onChange={handleInputChange}
                            id="species-cat"
                        />
                        <Form.Check
                            inline
                            label="Dog"
                            name="species"
                            type="radio"
                            value="dog"
                            checked={formData.species === 'dog'}
                            onChange={handleInputChange}
                            id="species-dog"
                        />
                    </div>
                </Form.Group>

                < Form.Group className="m-3" controlId="animalGender" >
                    <Form.Label>Gender </Form.Label>
                    < div className="mb-3" >
                        <Form.Check
                            inline
                            label="Female"
                            name="gender"
                            type="radio"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleInputChange}
                            id="gender-female"
                        />
                        <Form.Check
                            inline
                            label="Male"
                            name="gender"
                            type="radio"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleInputChange}
                            id="gender-male"
                        />
                    </div>
                </Form.Group>

                < Form.Group className="m-3" controlId="animalAge" >
                    <Form.Label>Life Stage </Form.Label>
                    < div className="mb-3" >
                        <Form.Check
                            inline
                            label="Baby"
                            name="life_stage"
                            type="radio"
                            value="baby"
                            checked={formData.life_stage === 'baby'}
                            onChange={handleInputChange}
                            id="life_stage-baby"
                        />
                        <Form.Check
                            inline
                            label="Junior"
                            name="life_stage"
                            type="radio"
                            value="junior"
                            checked={formData.life_stage === 'junior'}
                            onChange={handleInputChange}
                            id="life_stage-junior"
                        />
                        <Form.Check
                            inline
                            label="Adult"
                            name="life_stage"
                            type="radio"
                            value="adult"
                            checked={formData.life_stage === 'adult'}
                            onChange={handleInputChange}
                            id="life_stage-adult"
                        />
                        <Form.Check
                            inline
                            label="Senior"
                            name="life_stage"
                            type="radio"
                            value="senior"
                            checked={formData.life_stage === 'senior'}
                            onChange={handleInputChange}
                            id="life_stage-senior"
                        />
                    </div>
                </Form.Group>

                < Form.Label > Weight </Form.Label>
                < InputGroup className="mb-3" >
                    <Form.Control
                        aria - label="Amount (to the nearest kg)"
                    placeholder = "Weight in kg"
                    name = "weight"
                    value = {formData.weight}
                    onChange = {handleInputChange}
        />
                    <InputGroup.Text>kg </InputGroup.Text>
                </InputGroup>

                < Form.Group className="m-3" controlId="animalBreed" >
                    <Form.Label>Breed </Form.Label>
                    < Form.Control
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        placeholder="Enter breed"
                    />
                </Form.Group>

                < Form.Group className="m-3" controlId="animalLocation" >
                    <Form.Label>Location </Form.Label>
                    < Form.Control
                        as="select"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                    >
                        <option value="null" > Choose a location </option>
                        < option value="Aveiro" > Aveiro </option>
                        < option value="Beja" > Beja </option>
                        < option value="Braga" > Braga </option>
                        < option value="Bragança" > Bragança </option>
                        < option value="CasteloBranco" > Castelo Branco </option>
                        < option value="Coimbra" > Coimbra </option>
                        < option value="Evora" > Évora </option>
                        < option value="Faro" > Faro </option>
                        < option value="Guarda" > Guarda </option>
                        < option value="Leiria" > Leiria </option>
                        < option value="Lisboa" > Lisboa </option>
                        < option value="Portalegre" > Portalegre </option>
                        < option value="Porto" > Porto </option>
                        < option value="Santarém" > Santarém </option>
                        < option value="Setúbal" > Setúbal </option>
                        < option value="VianaDoCastelo" > Viana do Castelo </option>
                        < option value="VilaReal" > Vila Real </option>
                        < option value="Viseu" > Viseu </option>
                    </Form.Control>
                </Form.Group>

                < Form.Group className="m-3" controlId="animalIllnesses" >
                    <Form.Label>Known Illnesses </Form.Label>
                    < div className="mb-3" >
                        <Form.Check
                            inline
                            label="Yes"
                            name="known_illness"
                            type="radio"
                            value="yes"
                            checked={formData.known_illness === 'yes'}
                            onChange={handleInputChange}
                            id="illnesses-yes"
                        />
                        <Form.Check
                            inline
                            label="No"
                            name="known_illness"
                            type="radio"
                            value="no"
                            checked={formData.known_illness === 'no'}
                            onChange={handleInputChange}
                            id="illnesses-no"
                        />
                    </div>
                </Form.Group>

                < Form.Group className="m-3" controlId="animalDescription" >
                    <Form.Label>Description </Form.Label>
                    < Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter description"
                    />
                </Form.Group>

                < Form.Group className="m-3" controlId="animalImage" >
                    <Form.Label>Add Image </Form.Label>
                    < Form.Control
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {
                    formData.images.length > 0 && (
                        <Form.Group className="m-3" controlId="animalImages" >
                            <Form.Label>Current Images </Form.Label>
                            < Carousel interval={null} >
                                {
                                    formData.images.map((image, index) => (
                                        <Carousel.Item key={index} >
                                            <img
                                                className="d-block w-100"
                                                src={image.image_url} //depends on object 
                                                alt={`Animal Image ${index + 1}`}
                                                style={{ height: '300px', objectFit: 'contain' }
                                                }
                                            />
                                            < Carousel.Caption >
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleImageDelete(image.id)
                                                    }
                                                    disabled={isLoading} // Disable button while loading
                                                >
                                                    {
                                                        isLoading ? (
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria- hidden="true"
                                                            />
                                                        ) : (
                                                            'Delete Image'
                                                        )}
                                                </Button>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        </Form.Group>
                    )}

                <Button className='m-2' variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AdminEdit;
//////////////////////////////////admin edit
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { useAPI } from '../Context/Context';
import Spinner from 'react-bootstrap/Spinner';

function AdminEdit() {
    const location = useLocation();
    const { animalData } = location.state || {};
    //Killing bugs
    console.log("Received animalData:", animalData);

    const { deleteImage } = useAPI();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        species: '',
        gender: '',
        life_stage: '',
        weight: '',
        breed: '',
        location: '',
        known_illness: '',
        description: '',
        images: [], // armazenar images carrosel
    });

    useEffect(() => {
        if (animalData) {
            setFormData({
                id: animalData.id || '',
                name: animalData.name || '',
                species: animalData.species || '',
                gender: animalData.gender || '',
                life_stage: animalData.life_stage || '',
                weight: animalData.weight || '',
                breed: animalData.breed || '',
                location: animalData.location || '',
                known_illness: animalData.known_illness || '',
                description: animalData.description || '',
                images: animalData.images || [],
            });
        }
    }, [animalData]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

<<<<<<< ORIGINAL
    const handleImageDelete = async (imageId) => {
        setIsLoading(true);
        try {
            await deleteImage(imageId);

            const updatedImages = formData.images.filter((image) => image.id !== imageId);

            setFormData((prevData) => ({
                ...prevData,
                images: updatedImages,
            }));

            // Assuming animalData is updated in some global state or via API
            await updateAnimalData(formData.id, { ...formData, images: updatedImages });

            console.log(`Deleted image with ID: ${imageId}`);
        } catch (error) {
            console.error(`Failed to delete image with ID: ${imageId}`, error);
            alert(`Failed to delete image with ID: ${imageId}. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };
=======
const handleImageDelete = async (imageId) => {
  setLoadingImages((prev) => ({ ...prev, [imageId]: true }));
  try {
    console.log(`Attempting to delete image with ID: ${imageId}`);
    const deleteResponse = await deleteImage(imageId);

    if (!deleteResponse.success) {
      throw new Error(`API delete response for image ID ${imageId} indicates failure:`, deleteResponse);
    }

    console.log(`API delete response for image ID ${imageId}:`, deleteResponse);

    const updatedImages = formData.images.filter((image) => image.id !== imageId);

    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));

    console.log(`Updated images after deletion:`, updatedImages);

    const updateResponse = await updateAnimalData(formData.id, { ...formData, images: updatedImages });

    console.log(`API update response after image deletion:`, updateResponse);

    console.log(`Successfully deleted image with ID: ${imageId}`);
  } catch (error) {
    console.error(`Failed to delete image with ID: ${imageId}`, error);
    alert(`Failed to delete image with ID: ${imageId}. Please try again.`);
  } finally {
    setLoadingImages((prev) => ({ ...prev, [imageId]: false }));
  }
};
>>>>>>> EasyCode Suggestion

    //Aqui vai ser para fazer o put para atulizar os dados do animal
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the animal data
            await updateAnimalData(formData.id, formData);
            history.push('/admin'); // Redirect to another page after submission
        } catch (error) {
            console.error('Failed to update animal data', error);
            alert('Failed to update animal data. Please try again.');
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-3" controlId="animalId">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="id"
                        value={formData.id}
                        placeholder="Enter ID"
                        readOnly
                    />
                </Form.Group>

                <Form.Group className="m-3" controlId="animalName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                    />
                </Form.Group>

                <Form.Group className="m-3" controlId="animalSpecies">
                    <Form.Label>Species</Form.Label>
                    <div className="mb-3">
                        <Form.Check
                            inline
                            label="Cat"
                            name="species"
                            type="radio"
                            value="cat"
                            checked={formData.species === 'cat'}
                            onChange={handleInputChange}
                            id="species-cat"
                        />
                        <Form.Check
                            inline
                            label="Dog"
                            name="species"
                            type="radio"
                            value="dog"
                            checked={formData.species === 'dog'}
                            onChange={handleInputChange}
                            id="species-dog"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="m-3" controlId="animalGender">
                    <Form.Label>Gender</Form.Label>
                    <div className="mb-3">
                        <Form.Check
                            inline
                            label="Female"
                            name="gender"
                            type="radio"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleInputChange}
                            id="gender-female"
                        />
                        <Form.Check
                            inline
                            label="Male"
                            name="gender"
                            type="radio"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleInputChange}
                            id="gender-male"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="m-3" controlId="animalAge">
                    <Form.Label>Life Stage</Form.Label>
                    <div className="mb-3">
                        <Form.Check
                            inline
                            label="Baby"
                            name="life_stage"
                            type="radio"
                            value="baby"
                            checked={formData.life_stage === 'baby'}
                            onChange={handleInputChange}
                            id="life_stage-baby"
                        />
                        <Form.Check
                            inline
                            label="Junior"
                            name="life_stage"
                            type="radio"
                            value="junior"
                            checked={formData.life_stage === 'junior'}
                            onChange={handleInputChange}
                            id="life_stage-junior"
                        />
                        <Form.Check
                            inline
                            label="Adult"
                            name="life_stage"
                            type="radio"
                            value="adult"
                            checked={formData.life_stage === 'adult'}
                            onChange={handleInputChange}
                            id="life_stage-adult"
                        />
                        <Form.Check
                            inline
                            label="Senior"
                            name="life_stage"
                            type="radio"
                            value="senior"
                            checked={formData.life_stage === 'senior'}
                            onChange={handleInputChange}
                            id="life_stage-senior"
                        />
                    </div>
                </Form.Group>

                <Form.Label>Weight</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        aria-label="Amount (to the nearest kg)"
                        placeholder="Weight in kg"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                    />
                    <InputGroup.Text>kg</InputGroup.Text>
                </InputGroup>

                <Form.Group className="m-3" controlId="animalBreed">
                    <Form.Label>Breed</Form.Label>
                    <Form.Control
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        placeholder="Enter breed"
                    />
                </Form.Group>

                <Form.Group className="m-3" controlId="animalLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        as="select"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                    >
                        <option value="null">Choose a location</option>
                        <option value="Aveiro">Aveiro</option>
                        <option value="Beja">Beja</option>
                        <option value="Braga">Braga</option>
                        <option value="Bragança">Bragança</option>
                        <option value="CasteloBranco">Castelo Branco</option>
                        <option value="Coimbra">Coimbra</option>
                        <option value="Evora">Évora</option>
                        <option value="Faro">Faro</option>
                        <option value="Guarda">Guarda</option>
                        <option value="Leiria">Leiria</option>
                        <option value="Lisboa">Lisboa</option>
                        <option value="Portalegre">Portalegre</option>
                        <option value="Porto">Porto</option>
                        <option value="Santarém">Santarém</option>
                        <option value="Setúbal">Setúbal</option>
                        <option value="VianaDoCastelo">Viana do Castelo</option>
                        <option value="VilaReal">Vila Real</option>
                        <option value="Viseu">Viseu</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="m-3" controlId="animalIllnesses">
                    <Form.Label>Known Illnesses</Form.Label>
                    <div className="mb-3">
                        <Form.Check
                            inline
                            label="Yes"
                            name="known_illness"
                            type="radio"
                            value="yes"
                            checked={formData.known_illness === 'yes'}
                            onChange={handleInputChange}
                            id="illnesses-yes"
                        />
                        <Form.Check
                            inline
                            label="No"
                            name="known_illness"
                            type="radio"
                            value="no"
                            checked={formData.known_illness === 'no'}
                            onChange={handleInputChange}
                            id="illnesses-no"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="m-3" controlId="animalDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter description"
                    />
                </Form.Group>

                <Form.Group className="m-3" controlId="animalImage">
                    <Form.Label>Add Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {formData.images.length > 0 && (
                    <Form.Group className="m-3" controlId="animalImages">
                        <Form.Label>Current Images</Form.Label>
                        <Carousel interval={null}>
                            {formData.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={image.image_url} //depends on object 
                                        alt={`Animal Image ${index + 1}`}
                                        style={{ height: '300px', objectFit: 'contain' }}
                                    />
                                    <Carousel.Caption>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleImageDelete(image.id)}
                                            disabled={isLoading} // Disable button while loading
                                        >
                                            {isLoading ? (
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                'Delete Image'
                                            )}
                                        </Button>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Form.Group>
                )}

                <Button className='m-2' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AdminEdit;
 */