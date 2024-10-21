import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom';
import { useAPI } from '../Context/Context';
import { useState, useEffect } from 'react';

function AdoptionFormView() {
  const { fetchAdoptionForm } = useAPI(); // Get fetchAdoptionForm from the context
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch the adoption form data
    fetchAdoptionForm(id, token).then(result => {
      if (result.error) {
        setError(result.error);
      } else {
        setForm(result.data);
        console.log(result.data)
      }
      setLoading(false);
    });
  }, [id, fetchAdoptionForm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="6">
            <Card style={{ width: "60%", margin: "auto", marginTop: "1rem" }}>
              <Card.Body>
                <Card.Title>{form.animal_name}</Card.Title>
                <Card.Text>ID: {form.id}</Card.Text>
                <Link to={`/animalpage/${form.animal_id}`} >
                  <Button className='primaryButton'>
                    More
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Card style={{ width: "60%", margin: "auto", marginTop: "1rem" }}>
              <Card.Body>
                <Card.Title>{form.first_name}</Card.Title>
                <Card.Text>Email: {form.email}</Card.Text>
                <Link to="/userprofile" >
                  <Button className='primaryButton'>
                    Profile
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card style={{ width: "80%", margin: "auto", marginTop: "1rem" }}>
          <div style={{ display: "flex" }}>
            <div className="m-3" style={{ width: "50%" }}>
              <p>Phone number:</p>
              <p>{form.phone_number}</p>
            </div>
            <div className="m-3" style={{ width: "50%" }}>
              <p>Is this your first time having a pet? </p>
              <p className='answer'> {form.first_time_adopting ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <div className="m-3">
            <p>Do you already have any pets currently? If so, how many? </p>
            <p className='answer'> {form.already_have_pets || "NA"}</p>
          </div>

          <div className="m-3">
            <p>Please describe your current pets in detail.</p>
            <p className='answer'>{form.current_pets_description || "NA"}</p>
          </div>

          <div className="m-3">
            <p>Why are you interested in this particular animal?</p>
            <p className='answer'>{form.interest_reason}</p>
          </div>

          <div className="m-3">
            <p>Do you plan to meet this animal before the adoption or have you already met them?</p>
            <p className='answer'> {form.met_animal ? 'Yes' : 'No'}</p>
          </div>

          <div className="m-3">
            <p>Will the animal have space to play/be entertained? </p>
            <p className='answer'>{form.space_for_play ? 'Yes' : 'No'}</p>
          </div>

          <div className="m-3">
            <p>Will you be able to front initial vet bills, like neutering, as per the shelter's stipulations? </p>
            <p className='answer'> {form.able_to_front_vet_bills ? 'Yes' : 'No'}</p>
          </div>

          <Link to="/adoptionstatus">
            <Button className='tertiaryButton'>
              Return
            </Button>
          </Link>
        </Card>
      </Container>
    </>
  );
}

export default AdoptionFormView;
