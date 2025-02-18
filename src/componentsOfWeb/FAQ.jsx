import React from 'react';

const FAQ = () => {
    return (
       <div className='w-11/12 lg:w-10/12 mx-auto'>
        <h1 className="text-4xl lg:text-5xl text-center text-[#25224B] mb-16 mt-8 font-bold">Frequently Asked <span className="text-[#F06728]">Questions</span></h1>
         <div className='flex flex-col lg:flex-row gap-6  items-center mb-20 mt-16'>
             
             <img className='w-full lg:w-1/2' src="https://i.ibb.co.com/zHr5r7WV/faq-12.jpg" alt="" />
             <div className='w-full space-y-4'>
             <div class="collapse collapse-arrow bg-base-200  ">
   <input type="radio" name="my-accordion-2" checked="checked" />
   <div class="collapse-title text-xl  font-semibold">How do I book a parcel for delivery?</div>
   <div class="collapse-content">
     <p className='text-[#6C727C]'>To book a parcel, log in to your account and navigate to the "Parcel Booking" section. Fill in the necessary details, such as sender and recipient information, parcel size, and delivery date. Once submitted, you can make an online payment via Stripe and track your parcel from the dashboard.</p>
   </div>
 </div>
 <div class="collapse collapse-arrow bg-base-200">
   <input type="radio" name="my-accordion-2" />
   <div class="collapse-title text-xl  font-semibold">How can I check the status of my parcel?</div>
   <div class="collapse-content">
     <p className='text-[#6C727C]'>You can view all your booked parcels in the "Parcel List" section. Each parcel will have a status update such as Pending, In Transit, or Delivered. You can also see which deliveryman is handling your parcel.</p>
   </div>
 </div>
 <div class="collapse collapse-arrow bg-base-200">
   <input type="radio" name="my-accordion-2" />
   <div class="collapse-title text-xl  font-semibold">Can I update my profile details?</div>
   <div class="collapse-content">
     <p className='text-[#6C727C]'>Yes! Go to the "Profile" section to update your personal details such as name, contact information, and address. Keeping your profile updated ensures smooth communication and delivery.
     </p>
   </div>
 </div>
 <div class="collapse collapse-arrow bg-base-200">
   <input type="radio" name="my-accordion-2" />
   <div class="collapse-title text-xl  font-semibold">What payment options are available for parcel bookings?</div>
   <div class="collapse-content">
     <p className='text-[#6C727C]'>ParCella supports online payments through Stripe, allowing you to pay using debit or credit cards. This ensures a secure and seamless transaction for your parcel deliveries.</p>
   </div>
 </div>
             </div>
         </div>
       </div>
    );
};

export default FAQ;