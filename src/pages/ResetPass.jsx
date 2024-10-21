import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom'; // Import useParams to get the token from the URL
import axios from 'axios'; // Import axios for making the API request
import { useAPI } from './Context/Context';

function ResetPass() {
  const { url } = useAPI();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { token } = useParams(); // Get the token from the URL

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add validation to check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Pawprints do not match!");
      return;
    }

    try {
      // Submit the new password to the API endpoint   //altered for codespaces
      /* const response = await axios.post(`https://solid-couscous-wr9p957994vh9jp5-3000.app.github.dev/reset-password/${token}`, { */
      const response = await axios.post(`${url}/reset-password/${token}`, {
        password,
        confirm_password: confirmPassword,
      });

      // Handle success (e.g., show a success message, redirect the user, etc.)
      alert("Your pawprint has been reset successfully!");
    } catch (error) {
      // Handle errors (e.g., display an error message)
      setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <FloatingLabel
        controlId="floatingPassword"
        label="New password"
        className="mb-3 mt-3"
      >
        <Form.Control
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingConfirmPassword" label="Confirm new password">
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </FloatingLabel>
      <Button type="submit" className="primaryButton mt-3">
        Reset Password
      </Button>
    </Form>
  );
}

export default ResetPass;
