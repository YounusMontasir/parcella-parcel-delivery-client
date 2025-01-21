import React from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLoaderData } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Payment = () => {
    const prices = useLoaderData()
    console.log(prices);
    console.log("jhsadgfjh");
    
    
    return (
        <div className='w-10/12 mx-auto'>
           
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm prices={prices}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;