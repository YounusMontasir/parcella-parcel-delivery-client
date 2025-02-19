import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Autoplay, EffectCoverflow } from "swiper/modules";


const Review = () => {
  return (
    <div>
        <h1 className="text-4xl lg:text-5xl text-center text-[#25224B] mb-16 mt-8 font-bold">Hear from Our<span className="text-[#F06728]"> Satisfied Customers</span></h1>
        <div id="review" className="swiper-container mb-24">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        effect={"coverflow"} 
        grabCursor={true} 
        centeredSlides={true} 
        loop={true} 
        coverflowEffect={{
          rotate: 50, 
          stretch: 0, 
          depth: 100, 
          modifier: 1, 
        }}
        breakpoints={{
          320: {
            slidesPerView: 1, 
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2, 
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3, 
            spaceBetween: 50,
          },
        }}
        modules={[EffectCoverflow]} 
       
      >
        <SwiperSlide>
          <div className="bg-[#25224B]">
          <div className="pt-10">
          <img
              src="https://i.ibb.co/PM2dtYS/man1.jpg"
              alt="Review 1"
              className="w-40 h-40 rounded-full mx-auto object-cover"
            />
          </div>
            <div className="flex flex-col justify-center items-center mt-10">
              <div class="rating">
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                  checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
              </div>
              <h1 className="text-white mt-6 pb-10 md:w-9/12">
              "I needed to send an urgent package, and this service delivered it on time without any hassle. Highly recommended!" 
              </h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[#25224B]">
          <div className="pt-10">
          <img
              src="https://i.ibb.co.com/xm5p1by/w2.jpg"
              alt="Review 1"
              className="w-40 h-40 rounded-full mx-auto object-cover"
            />
          </div>
            <div className="flex flex-col justify-center items-center mt-10">
              <div class="rating">
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                  checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
              </div>
              <h1 className="text-white mt-6 pb-10 md:w-9/12">
              "Booking a parcel was super simple, and the rates were budget-friendly. A great experience overall!"
              </h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[#25224B]">
          <div className="pt-10">
          <img
              src="https://i.ibb.co.com/HN2kMhz/woman1.jpg"
              alt="Review 1"
              className="w-40 h-40 rounded-full mx-auto object-cover"
            />
          </div>
            <div className="flex flex-col justify-center items-center mt-10">
              <div class="rating">
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                  checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
              </div>
              <h1 className="text-white mt-6 pb-10 md:w-9/12">
              "I love how I could track my package in real-time. It gave me peace of mind knowing exactly where my parcel was!" 
              </h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[#25224B]">
          <div className="pt-10">
          <img
              src="https://i.ibb.co.com/Wtdxt30/man-4.jpg"
              alt="Review 1"
              className="w-40 h-40 rounded-full mx-auto object-cover"
            />
          </div>
            <div className="flex flex-col justify-center items-center mt-10">
              <div class="rating">
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                  checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400" checked="checked"
                />
              </div>
              <h1 className="text-white mt-6 pb-10 md:w-9/12">
              "Had a small issue with my booking, but customer support resolved it quickly. Very professional and helpful!"
              </h1>
            </div>
          </div>
        </SwiperSlide>
        {/* Add more slides here */}
      </Swiper>
    </div>
    </div>
  );
};

export default Review;