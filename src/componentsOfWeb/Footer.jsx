import React from 'react';
import logo2 from './../assets/asset/logo33.png'
import { Link } from 'react-router-dom';
import { Facebook, Locate, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const Footer = () => {
    return (
        <div className='bg-[#25224B] p-12 pb-12'>
          <div className='w-11/12 lg:w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-3 items-start gap-6'>
        <div>
        <div className="flex items-center">
    <img src={logo2} className='h-12 w-16 lg:h-16 lg:w-20' alt="" />
    <Link to='/' className='text-2xl lg:text-3xl text-[#F06728] font-bold'>Par<span className='text-white'>Cella</span></Link>
  </div>
  <div className='flex flex-col gap-3 mt-6 ml-3'>
    <div className='flex gap-2 items-center '>
    <button className='bg-[#F06728] p-2 rounded-full text-white'><Mail></Mail></button>
    <p className='text-white'>info@parcella.com</p>
    </div>
    <div className='flex gap-2 items-center '>
    <button className='bg-[#F06728] p-2 rounded-full text-white'><Phone></Phone></button>
    <p className='text-white'>01456564682</p>
    </div>
    <div className='flex gap-2 items-center '>
    <button className='bg-[#F06728] p-2 rounded-full text-white'><Locate></Locate></button>
    <p className='text-white'>Chittagong, Bangladesh</p>
    </div>
    
    
  </div>
        </div>
        {/* grid 2 */}
        <div>
        <h3 className='text-3xl text-white mb-4 font-semibold mt-5'>Company</h3>
        <ul className='text-white space-y-2'>
          <li>About</li>
          <li>Contact Us</li>
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
        </ul>
        </div>
        {/* grid-3 */}
        <div>
          <h3 className='text-3xl text-white mb-4 font-semibold mt-5'>Stay in touch</h3>
          <p className='text-xl text-gray-400 mb-6'>They've become informed passionate thanks opportunities provided by organization.</p>
          <div className="relative w-full">
  <input
    type="text"
    placeholder="Enter your text"
    className="w-full p-[10px] pr-20 border rounded-md" // Added right padding for the button
  />
  <Button
    className="absolute right-1 top-1 bottom-1 px-4 bg-[#F06728] text-white rounded-md" // Adjusted position for proper alignment
  >
    Submit
  </Button>
</div>
        </div>
          </div>
           
        </div>
    );
};

export default Footer;