import React from 'react';

const Features = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 w-10/12 gap-12 mx-auto my-24'>
            <div className="card bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src="https://i.ibb.co.com/FB00hHs/icons8-delivery-truck-96.png"
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Fast and Reliable Delivery</h2>
    <p>Enjoy speedy and dependable delivery services that ensure your packages arrive on time, every time.</p>
    
  </div>
</div>            
{/* card 2 */}
<div className="card bg-base-100  shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src="https://i.ibb.co.com/jTPSxS6/icons8-time-100.png"
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Real-Time Tracking</h2>
    <p>Stay updated with live tracking of your orders, so you always know where your package is.</p>
    
  </div>
</div>            
{/* card 3 */}
<div className="card bg-base-100  shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src="https://i.ibb.co.com/0hr9ygG/icons8-secure-package-96.png"
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Secure Packaging</h2>
    <p>Your items are handled with care and packaged securely to ensure they arrive in perfect condition.</p>
    
  </div>
</div>            
        </div>
    );
};

export default Features;
