import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-base-100 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#F06728] mb-6">About <span className="text-[#25224B]">ParCella</span></h2>
        <p className="text-lg text-gray-600 mb-8">
          ParCella is a cutting-edge parcel delivery management platform designed to
          make sending and receiving packages seamless. We connect users, deliverymen,
          and administrators in a unified system to ensure fast, reliable, and
          trackable deliveries.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
        {/* Feature Cards */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <img className="mx-auto  mb-6" src="https://i.ibb.co.com/nHXmHT6/icons8-booking-100.png" alt="" />
          <h3 className="text-xl font-semibold text-[#F06728] mb-3">Seamless Booking</h3>
          <p className="text-gray-600">Easily book parcels with just a few clicks and track them in real-time.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <img className="mx-auto mb-6" src="https://i.ibb.co.com/YFCrVsjb/icons8-debit-card-100.png" alt="" />
          <h3 className="text-xl font-semibold text-[#F06728] mb-3">Secure Payments</h3>
          <p className="text-gray-600">Make hassle-free payments through our secure Stripe integration.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <img className="mx-auto mb-6" src="https://i.ibb.co.com/9mRyy1yB/delivery-truck.png" alt="" />
          <h3 className="text-xl font-semibold text-[#F06728] mb-3">Reliable Delivery</h3>
          <p className="text-gray-600">Our professional deliverymen ensure safe and timely parcel deliveries.</p>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose ParCella?</h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          At ParCella, we prioritize customer satisfaction with efficient delivery,
          real-time tracking, and a user-friendly experience. Join thousands of
          happy customers who trust us with their parcel deliveries.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
