import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutForm = ({ prices }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    if (prices.price > 0) {
      axiosPublic.post('/create-payment-intent', { price: prices.price })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosPublic, prices?.price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (paymentError) {
      setError(paymentError.message);
    } else {
      setError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
    } else if (paymentIntent?.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        price: prices.price,
        transactionId: paymentIntent.id,
        date: new Date(),
        status: 'pending',
      };

      const res = await axiosPublic.post('/payments', payment);
      if (res.data?.paymentResult?.insertedId) {
        // navigate('/dashboard/confetti')
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Card Details</label>
            <div className="border border-gray-300 rounded-lg p-3 mt-1 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': { color: '#aab7c4' },
                    },
                    invalid: { color: '#9e2146' },
                  },
                }}
              />
            </div>
          </div>
          <div className="text-gray-600 mb-4">
            <p>Total: <span className="font-semibold text-gray-800">${prices.price}</span></p>
          </div>
          <Link to="/confetti">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!stripe || !clientSecret}
          >
            Pay Now
          </button>
          </Link>
          {error && <p className="text-red-600 mt-3">{error}</p>}
          {transactionId && (
            <p className="text-green-600 mt-3">
              Your Transaction ID: <span className="font-semibold">{transactionId}</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
