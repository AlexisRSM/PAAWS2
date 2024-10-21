import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; //Navigate serves to redirect
//Added by RM
import { useAPI } from '../pages/Context/Context';
import React, { useState } from 'react';
import axios from 'axios';


function Login() {
  const { loginUser } = useAPI(); //Hook to acess login func -RM
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  }); //Object to practice my non existent skills with objects
  const [error, setError] = useState(null); // For  Man handling login errors :P
  const [loading, setLoading] = useState(false); // For turning off the button while processing
  //States for password reseting
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate(); // Hook for redirection

  //Handle input changes 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // //Keep the rest of the form data intact
      [name]: value, //update field                          
    })
  }
  // Handle form submission – where dreams come to die
  const handleSubmit = async (e) => {
    e.preventDefault();  // Stop the page from refreshing, because who likes that?
    setLoading(true); //  temporary vacation for button while processing
    setError(null); // Clear the previous disasters

    try {
      const response = await loginUser(formData); // Let's see if the API likes us today
      // Here is the post-login magic- redirect the user somewere nice (update when PAAWS is further in life)
      console.log('Login successful:', response); //test
      navigate('/'); //Redirects user to profile page
      // changed this  because it'll fit better with the presentation's flow - BF
    } catch (err) {
      setError('Something smells funny... Is your pawprint incorrect?'); // Tell user he messed up (politely :D)
    } finally {
      setLoading(false); //Button back from vacation!
    }
  };

  // For the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //For password reseting
  const handlePasswordReset = async () => {
    try {                                     //changed to codespaces link
      const response = await axios.post('https://solid-couscous-wr9p957994vh9jp5-3000.app.github.dev/request-password-reset', { email: resetEmail });
      setResetMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setResetMessage(error.response.data.message);
      } else {
        setResetMessage('An error occurred. Please try again.');
      }
    }
  };

  return (<>
    <Container fluid>

    <Form onSubmit={handleSubmit} className='my-3'style={{ width: "30%", margin: "auto" }}>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ color: '#000' }} // Add this line
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ color: '#000' }} // Add this line
          />
      </FloatingLabel>

      <Link onClick={handleShow} className='nonBtnLink forgotPass' >
        <p style={{ marginTop: "1em"}}>Forgot your password?</p>
      </Link>

      {error && <p className="text-danger">{error}</p>}

      <Button className='primaryButton m-2' variant="success" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Submit'}
      </Button>

      <p style={{ marginTop: "1em"}}>Don't have an account? <Link to='/register' className='nonBtnLink'>Register</Link>!</p>
    </Form>
    </Container>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Email confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>We'll send you an email with a link to reset your password.</p>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        </FloatingLabel>
        {resetMessage && <p className="text-info">{resetMessage}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button className='secondaryButton' onClick={handleClose}>
          Close
        </Button>
        <Button className="primaryButton" onClick={() => { handlePasswordReset(); handleClose(); }}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>

  </>
  );
}

export default Login;