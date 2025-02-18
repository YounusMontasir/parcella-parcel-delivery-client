import { Locate, Mail, Phone } from 'lucide-react';
import React from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
    const contactUs = (e) =>{
        e.preventDefault()
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thank you! Your message has been sent successfully.",
            showConfirmButton: false,
            timer: 1500
          });
    }
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto mb-16 mt-16'>
             <h2 className="text-4xl font-bold text-[#F06728] mb-16 text-center">CONTACT <span className="text-[#25224B]">US</span></h2>
             <div className='grid lg:grid-cols-3 grid-cols-1 gap-6 items-center'>
             <div className='flex flex-col gap-8 mt-6 ml-3'>
    <div className='flex gap-2 items-center '>
    <button className='bg-[#F06728] p-2 rounded-full text-white'><Mail></Mail></button>
    <p className='text-[#696971]'>info@parcella.com</p>
    </div>
    <hr />
    <div className='flex gap-2 items-center '>
    <button className='bg-[#F06728] p-2 rounded-full text-white'><Phone></Phone></button>
    <p className='text-[#696971]'>01456564682</p>
    </div>
    <hr />
    <div className='flex gap-2 items-center '>
    <button className='bg-[#F06728] p-2 rounded-full text-white'><Locate></Locate></button>
    <p className='text-[#696971]'>Chittagong, Bangladesh</p>
    </div>
    
    
  </div>
  <div className="col-span-2 bg-gray-100 p-10 rounded-2xl shadow-md max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Get In Touch</h2>
        <form onSubmit={contactUs} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input  type="text" placeholder="Your Name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Phone Number" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50" />
            <input type="text" placeholder="City" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50" />
          </div>
          <textarea placeholder="Your Message" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 h-28"></textarea>
          <button type="submit" className="w-full bg-[#F06728] text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition">
            Submit Now
          </button>
        </form>
      </div>
                

             </div>
        </div>
    );
};

export default Contact;