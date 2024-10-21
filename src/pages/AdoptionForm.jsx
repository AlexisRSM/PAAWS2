// Form with mandatory questions and user contact info

// Either the name of the animal (and ID/chip?) will be locked in from AnimalPage, or there should be the option to add both manually (maybe with Clear form button)

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//Added by RM
import { useAPI } from './Context/Context';
import { Link, useNavigate } from 'react-router-dom'; //test
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma/bulma.css';
import loadincat from '../images/gifs/newloadingcato.gif'
import autoAnimate from '@formkit/auto-animate';


//if we wanted we could use prop and avoid fetching
//but when someone goes directly to link it wont work ex:bookmark the form
function AdoptionForm() {
  const { id } = useParams();
  //kiling bugs
  console.log("I am id useParams", id)
  const navigate = useNavigate();

  const { getAnimal, createAdoption } = useAPI();
  const [animal, setAnimal] = useState(null);
  //might need or not 
  const [formData, setFormData] = useState({
    phone_number: '',
    first_time_adopting: '',
    already_have_pets: '',
    current_pets_description: '',
    animal_reference: 'HARDCODED_REFERENCE', // Set to hardcoded value
    interest_reason: '',
    met_animal: '',
    space_for_play: '',
    able_to_front_vet_bills: '',
    first_name: '',  // Added
    last_name: '',   // Added
    email: ''        // Added
  });

  const dependentQuestionsRef = useRef(null);

  useEffect(() => {
    // Fetch the animal data using the id
    const fetchAnimal = async () => {
      try {
        const fetchedAnimal = await getAnimal(id);
        setAnimal(fetchedAnimal);
      } catch (error) {
        console.error('Error fetching animal:', error);
      }
    };

    fetchAnimal();

    const user = JSON.parse(localStorage.getItem('user'));
    //killing bugs
    console.log('yo', user)
    if (user) {

      setFormData((prevData) => ({
        ...prevData,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      }));
    }
  }, [getAnimal, id]);

  useEffect(() => {
    if (dependentQuestionsRef.current) {
      autoAnimate(dependentQuestionsRef.current); // Apply auto-animate to the dependent questions container
    }
  }, [dependentQuestionsRef]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log('Updated formData:', formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("I am animal Adoption Form", animal)
      const adoptionData = {
        ...formData,
        animal_id: animal.id,
        animal_name: animal.name,
        animal_reference: "yey",          /*  animal.reference */

      };
      console.log("Adoption form sending adoption data", adoptionData);
      await createAdoption(adoptionData);
      //Put a sucess message (also redirect user somewere (see how to prevent same submition -RM))
      navigate('/userprofile')  //could also navigate to a thank you for adopting page and tehn back to profile (just couple secs -RM)
    } catch (error) {
      console.error('Adoption submission failed:', error);
      /*  alert("Adoption submition failed! Can not resubmit application to same pet") */
      Swal.fire({
        title: "Duplicate Form!",
        text: "Adoption submission failed! Cannot resubmit application to thesame pet.",
        icon: "error",
        confirmButtonColor: '#2AD897',
      });
    }
  };

  if (!animal) return <div><img src={loadincat} /></div>;


  console.log(formData.first_time_adopting)

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="6">
            <Card className='adoptionFormCard' >
              <Card.Body>
                <Card.Title>{animal.name}</Card.Title>
                <Card.Text> {animal.life_stage} {animal.species} <br />
                  ID:  {animal.id}</Card.Text>
                <Link to={`/animalpage/${animal.id}`}  >
                  <Button className="primaryButton">
                    More
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Card className='adoptionFormCard'>
              <Card.Body>
                <Card.Title>{formData.first_name} {formData.last_name}</Card.Title>
                <Card.Text>Email: <br /> {formData.email}</Card.Text>
                <Link to="/userprofile">
                  <Button className="primaryButton">
                    Profile
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Form>
          {/* Hidden Input for Animal Reference */}
          <Form.Control
            type="hidden"
            name="animal_reference"
            value={formData.animal_reference}
            onChange={handleChange}
          />
        </Form>

        <Form onSubmit={handleSubmit} className='adminForm'>
          <div style={{ display: "flex" }}>
            <Form.Group className="m-3" controlId="formBasicPhone" style={{ width: "50%" }}>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </Form.Group>

            <Form.Group className="m-3" controlId="formFirstTimeAdopting" style={{ width: "50%" }}>
              <Form.Label>Is this your first time having a pet?</Form.Label>
              <Form.Control as="select"
                name="first_time_adopting"
                value={formData.first_time_adopting}
                onChange={handleChange}
                placeholder="Select your answer"
                required
              >
                <option value="">
                  Select your answer
                </option>
                <option value="Yes">
                  Yes
                </option>
                <option value="No">
                  No
                </option>
              </Form.Control>
            </Form.Group>
          </div>

          {/* Not working yet - BF */}
          {formData.first_time_adopting == "No" && (
            <div className="dependentQuestions" ref={dependentQuestionsRef}>
              <Form.Group className="m-3" controlId="formAlreadyHavePets">
                <Form.Label>Do you already have any pets currently? If so, how many?</Form.Label>
                <Form.Control
                  type="text"
                  name="already_have_pets"
                  value={formData.already_have_pets}
                  onChange={handleChange}
                  placeholder="Enter your answer"
                  required
                />
              </Form.Group>

              <Form.Group className="m-3" controlId="formCurrentPetsDescription">
                <Form.Label>Please describe your current pets in detail.</Form.Label>
                <Form.Control as="textarea"
                  type="text"
                  name="current_pets_description"
                  value={formData.current_pets_description}
                  onChange={handleChange}
                  placeholder="Enter your answer"
                  required
                />
              </Form.Group>

            </div>
          )}

          <Form.Group className="m-3" controlId="formInterestReason">
            <Form.Label>Why are you interested in this particular animal?</Form.Label>
            <Form.Control as="textarea"
              type="text"
              name="interest_reason"
              value={formData.interest_reason}
              onChange={handleChange}
              placeholder="Enter your answer"
              required
            />
          </Form.Group>

          <Form.Group className="m-3" controlId="formMetAnimal">
            <Form.Label>Do you plan to meet this animal before the adoption or have you already met them?</Form.Label>
            <Form.Control as="textarea"
              type="text"
              name="met_animal"
              value={formData.met_animal}
              onChange={handleChange}
              placeholder="Enter your answer"
              required
            />
          </Form.Group>

          <Form.Group className="m-3" controlId="formSpaceForPlay">
            <Form.Label>Will the animal have space to play/be entertained?</Form.Label>
            <Form.Control as="textarea"
              type="text"
              name="space_for_play"
              value={formData.space_for_play}
              onChange={handleChange}
              placeholder="Enter your answer"
              required
            />
          </Form.Group>

          <Form.Group className="m-3" controlId="formVetBills">
            <Form.Label>Will you be able to front initial vet bills, like neutering, as per the shelter's stipulations?</Form.Label>
            <Form.Control as="textarea"
              type="text"
              name="able_to_front_vet_bills"
              value={formData.able_to_front_vet_bills}
              onChange={handleChange}
              placeholder="Enter your answer"
              required
            />
          </Form.Group>

          <div className=''>
          <Button className='m-2 primaryButton' type="submit"
          >
            Submit
          </Button>
          <Link to={`/animalpage/${animal.id}`}>
            <Button className='tertiaryButton' style={{marginTop: "0em"}}>
              Return
            </Button>
          </Link>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default AdoptionForm;