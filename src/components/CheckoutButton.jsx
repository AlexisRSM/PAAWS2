import React, { useState } from 'react';
import axios from 'axios';
import { useAPI } from '../pages/Context/Context';
import { FloatingLabel, Button, Form } from 'react-bootstrap';


const CheckoutButton = ({ userinfo, animalinfo, typeOfSponsorship }) => {

    // Ensure that userinfo and animalinfo are available
    /*  if (!userinfo || !animalinfo) {
        alert('User or animal information is missing.');
        return;
    } */

    const { url } = useAPI(); //url for the host
    console.log(url)
    console.log("I am user info and animal info in sponsor button", userinfo, animalinfo)
    // State to hold the amount
    const [amount, setAmount] = useState('');

    const handleCheckout = async () => {
        try {
            // Validate the amount or convert it to the proper format if necessary
            const validAmount = parseInt(amount, 10);
            if (isNaN(validAmount) || validAmount <= 0) {
                alert('Please enter a valid amount.');
                return;
            }

            // Ensure userinfo and animalinfo are provided
            if (!userinfo || !animalinfo) {
                alert('User or animal information is missing.');
                return;
            }
            console.log("I am type of sponsorship", typeOfSponsorship)
            // Send the request to your backend             //changed to codespaces link


            const response = await axios.post(`${url}/create-${typeOfSponsorship}-session`, {
                amount: validAmount,
                user_id: userinfo.id,  // Assuming userinfo has an 'id' property
                animal_id: animalinfo.id  // Assuming animalinfo has an 'id' property
            });

            console.log("Checkout session URL:", response.data.url);
            window.location.href = response.data.url; // Redirect to Stripe's hosted checkout page
        } catch (error) {
            console.error('Error:', error);
            alert('There was an issue with your checkout.');
        }
    };

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
            <FloatingLabel
                controlId="floatingInput"
                label="Enter amount"
                className="mb-3"
            >
                <Form.Control type="number" value={amount}placeholder="Enter amount" 
                onChange={(e) => setAmount(e.target.value)}/>
            </FloatingLabel>
            {/* <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '200px', textAlign: 'center' }} // Styling input
            /> */}
            <Button className='btn primaryButton'
                onClick={handleCheckout}
            >
                Go to Checkout
            </Button>
        </div>
    );
}

export default CheckoutButton;
