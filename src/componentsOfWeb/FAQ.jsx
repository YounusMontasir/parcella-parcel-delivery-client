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
   <div class="collapse-title text-xl  font-semibold">How does Suggestify work?</div>
   <div class="collapse-content">
     <p className='text-[#6C727C]'>Suggestify allows users to post queries about any product they are looking for. Other users can then recommend suitable products based on their experience or knowledge. This helps users make informed purchasing decisions.</p>
   </div>
 </div>
 <div class="collapse collapse-arrow bg-base-200">
   <input type="radio" name="my-accordion-2" />
   <div class="collapse-title text-xl  font-semibold">Do I need an account to ask or recommend products?</div>
   <div class="collapse-content">
     <p className='text-[#6C727C]'>Yes, you need to create an account and log in to ask queries or recommend products. This ensures a secure and interactive experience while maintaining the credibility of recommendations.</p>
   </div>
 </div>
 <div class="collapse collapse-arrow bg-base-200">
   <input type="radio" name="my-accordion-2" />
   <div class="collapse-title text-xl  font-semibold">Can I edit or delete my queries and recommendations?</div>
   <div class="collapse-content">
     <p className='text-[#6C727C]'>Yes, you can edit or delete your queries and recommendations anytime from your profile dashboard. This gives you full control over your contributions.
     </p>
   </div>
 </div>
 <div class="collapse collapse-arrow bg-base-200">
   <input type="radio" name="my-accordion-2" />
   <div class="collapse-title text-xl  font-semibold">How can I find product recommendations for my query?</div>
   <div class="collapse-content">
     <p className='text-[#6C727C]'>Once you post a query, other users can respond with recommendations. You can check the responses under your query and see the suggested products along with user comments.</p>
   </div>
 </div>
             </div>
         </div>
       </div>
    );
};

export default FAQ;