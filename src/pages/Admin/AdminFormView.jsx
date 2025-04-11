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
      <Container fluid className="adminFormView">
        <Row>
          <Col lg="6">
            <Card>
              <Card.Body>
                <Card.Title>{form.animal_name}</Card.Title>
                <Card.Text>ID: {form.id}</Card.Text>
                <Link to={`/animalpage/${form.animal_id}`}>
                  <Button className='primaryButton'>
                    More
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <Card.Body>
                <Card.Title>{form.first_name}</Card.Title>
                <Card.Text>Email: {form.email}</Card.Text>
                <Link to="/userprofile">
                  <Button className='primaryButton'>
                    Profile
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            <div className="d-flex flex-wrap">
              <div className="m-3 flex-grow-1">
                <p><strong>Phone number:</strong></p>
                <p className="answer">{form.phone_number}</p>
              </div>
              <div className="m-3 flex-grow-1">
                <p><strong>First time having a pet?</strong></p>
                <p className="answer">{form.first_time_adopting ? 'Yes' : 'No'}</p>
              </div>
            </div>

            <div className="m-3">
              <p><strong>Current pets:</strong></p>
              <p className="answer">{form.already_have_pets || "NA"}</p>
            </div>

            <div className="m-3">
              <p><strong>Current pets description:</strong></p>
              <p className="answer">{form.current_pets_description || "NA"}</p>
            </div>

            <div className="m-3">
              <p><strong>Interest reason:</strong></p>
              <p className="answer">{form.interest_reason}</p>
            </div>

            <div className="m-3">
              <p><strong>Plan to meet animal:</strong></p>
              <p className="answer">{form.met_animal ? 'Yes' : 'No'}</p>
            </div>

            <div className="m-3">
              <p><strong>Space for play:</strong></p>
              <p className="answer">{form.space_for_play ? 'Yes' : 'No'}</p>
            </div>

            <div className="m-3">
              <p><strong>Can front vet bills:</strong></p>
              <p className="answer">{form.able_to_front_vet_bills ? 'Yes' : 'No'}</p>
            </div>

            <div className="text-center mt-4">
              <Link to="/adoptionstatus">
                <Button className='tertiaryButton'>
                  Return
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AdoptionFormView;
