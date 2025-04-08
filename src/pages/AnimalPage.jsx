import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAPI } from './Context/Context';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'; // Import Modal
import SponsorPage from './SponsorPage'; // Import SponsorPage
import autoAnimate from '@formkit/auto-animate';
import loadincat from '../images/gifs/newloadingcato.gif'
import ImageSwitcher from '../components/ImageSwitch';

function AnimalPage() {
  const { getAnimal } = useAPI();
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [showSponsorModal, setShowSponsorModal] = useState(false); // State to control modal visibility

  const modalBodyRef = useRef(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const fetchedAnimal = await getAnimal(id);
        setAnimal(fetchedAnimal);
      } catch (error) {
        console.error('Error fetching animal:', error);
      }
    };

    fetchAnimal();
  }, [id, getAnimal]);

  useEffect(() => {
    if (modalBodyRef.current) {
      autoAnimate(modalBodyRef.current); // Apply auto-animate to the modal body
    }
  }, [modalBodyRef]);

  if (!animal) {
    return <img src={loadincat} />;
  }

  /* add carousel for images!! */
  return (
    <>
      <Card className='animalPage' key={animal}>
        <Row>
          <Col lg="5">
            {/*  <Card.Img className="animalPageImg" src={animal.images[0].image_url} alt="animal picture" /> */}
            <ImageSwitcher images={animal.images} />
          </Col>
          <Col lg="7">
            <Card.Body className='animalPageDesc'>
              <Card.Title style={{ marginBottom: "1em" }}><h2> {animal.name || "Unknown Animal"} </h2></Card.Title>
              <Card.Text className='animalPageText' style={{ marginBottom: "5em" }}>
                <p><strong>Species:</strong> {animal.species || "Unknown"} </p>
                <p><strong>Gender:</strong> {animal.gender || "Unknown"} </p>
                <p><strong>Age:</strong> {animal.life_stage || "Unknown"} </p>
                <p><strong>Weight:</strong> {`${animal.weight} kg` || "Unknown"}</p>
                <p><strong>Breed:</strong> {animal.breed || "Unknown"}</p>
                <p><strong>Location:</strong> {animal.location || "Unknown"}</p>
                <p><strong>Known illnesses:</strong> {animal.known_illness || "Unknown"}</p>
                <strong>Description:</strong> {animal.description || "Unknown"}
              </Card.Text>
              <div className="animalPageBtn" >
                <Button
                  className='primaryButton'
                  style={{ marginRight: "1rem" }}
                  onClick={() => setShowSponsorModal(true)} // Open modal on click
                >
                  Sponsor
                </Button>
                <Link to="/ourpets">
                  <Button className='tertiaryButton'>
                    Return
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Modal for SponsorPage */}
      <Modal
        show={showSponsorModal}
        onHide={() => setShowSponsorModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sponsor {animal.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={modalBodyRef}>
          <SponsorPage />
        </Modal.Body>
      </Modal>

      {/* link to adoption form */}
      <div className="toAdoptionForm">
        <h4>Interested in adopting instead?</h4>
        <p>Check out our <Link to={`/adoptionform/${animal.id}`} className='nonBtnLinkTwo'>form</Link></p>
      </div>
    </>
  );
}

export default AnimalPage;
