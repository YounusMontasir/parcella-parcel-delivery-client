import { BookImageIcon, NotebookPen } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const ParcelBooking = () => {
    return (
        <div>
             <h2 className="text-4xl lg:text-5xl text-center text-[#25224B] mb-16 mt-8 font-bold">Send Your Parcel <span className="text-[#F06728]">with Ease!</span></h2>
              <div className="bg-[#25224B] py-10 px-6 text-center">
      <h2 className="text-3xl font-bold text-[#F06728] mb-3">
        Hassle-Free Parcel Booking!
      </h2>
      <p className="text-white mb-5">
        Send your package anywhere with ease. Fast, reliable, and affordable.
      </p>
     <Link to='/dashboard'> <button className="bg-[#F06728] text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto font-semibold hover:bg-blue-700 transition">
       <NotebookPen></NotebookPen> Book a Parcel
      </button></Link>
    </div>
        </div>
    );
};

export default ParcelBooking;