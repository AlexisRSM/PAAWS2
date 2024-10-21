import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useAPI } from './Context/Context';
import CheckoutButton from '../components/CheckoutButton';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


function SponsorPage() {
  const { getAnimal, user } = useAPI();
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const publishableKey = import.meta.env.VITE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const [key, setKey] = useState('subscription');

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

  return (
    <div style={{ padding: '1rem' }}>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
      >
        <Tab eventKey="subscription" title="Monthly" >
          <div style={{ textAlign: "center"}}>
            <h3>Monthly Subscription</h3>
            <p >Support this animal with a monthly donation.</p>
            <CheckoutButton userinfo={user} animalinfo={animal} typeOfSponsorship={key} />
          </div>
        </Tab>
        <Tab eventKey="checkout" title="One-time">
          <div style={{ textAlign: "center"}}>
            <h3>One-time Payment</h3>
            <p>Support this animal with a one-time donation.</p>
            <CheckoutButton userinfo={user} animalinfo={animal} typeOfSponsorship={key} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default SponsorPage;
