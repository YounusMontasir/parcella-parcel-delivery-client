import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const Brands = () => {
    return (
       <div>
        <h1 className="text-4xl lg:text-5xl text-center text-[#25224B] mb-16 mt-8 font-bold">Our Trusted <span className="text-[#F06728]">Collaborators</span></h1>
         <div id='brand' className='mb-24'>
            <Swiper
            modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={6}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                
            >
                <SwiperSlide className='flex justify-center items-center'>
                    <img
                        className="object-contain h-48 w-full"
                        src="https://i.ibb.co.com/2729zV9s/download-round-dhl-express-delivery-logo-icon-png-701751695035671nhorrw95xk.png"
                        alt="Cricket"
                    />
                </SwiperSlide>
                <SwiperSlide className='flex justify-center items-center'>
                    <img
                        className="object-contain h-48 w-full"
                        src="https://i.ibb.co.com/4ZbdyZpJ/images-q-tbn-ANd9-Gc-SDif1b-JH2kkytzykp-WQl-GEu-XLipa-Ctbhlc-Bw-s.png"
                        alt="Football"
                    />
                </SwiperSlide>
                <SwiperSlide className='flex justify-center w-full items-center'>
                    <img
                        className="object-contain h-48 w-full"
                        src="https://i.ibb.co.com/wrrS8spH/images-q-tbn-ANd9-Gc-Shk-TWWZv2wujlbh-Wpx-BKx1v-Cp8-U-V5ol52-w-s.jpg"
                        alt="Volleyball"
                    />
                </SwiperSlide>
                <SwiperSlide className='flex justify-center items-center'>
                    <img
                        className="object-contain h-48 w-full"
                        src="https://i.ibb.co.com/GvtMfSkG/hd-aramex-delivery-unlimited-company-logo-png-701751694777892u29zsabox0.png"
                        alt="General Sports"
                    />
                </SwiperSlide>
                <SwiperSlide className='flex justify-center items-center '>
                    <img
                        className="object-contain h-48 w-full"
                        src="https://i.ibb.co.com/w2fq0VG/460-4608309-blue-dart-logo-transparent-blue-dart-express-logo.jpg"
                        alt="Basketball"
                    />
                </SwiperSlide>
                <SwiperSlide className='flex justify-center items-center'>
                    <img
                        className="object-contain h-48 w-full"
                        src="https://i.ibb.co.com/gZ50dZPt/avdegic5l.webp"
                        alt="Badminton"
                    />
                </SwiperSlide>
                <SwiperSlide className='flex justify-center items-center'>
                    <img
                        className="object-contain h-48 w-full"
                        src="https://i.ibb.co.com/1trCTPmb/alibaba-com-logo-png-seeklogo-6545.png"
                        alt="Rugby"
                    />
                </SwiperSlide>
                <SwiperSlide className='flex justify-center items-center'>
                    <img
                        className="object-contain h-48 w-full"
                        src="https://i.ibb.co.com/wNckShKN/images-q-tbn-ANd9-Gc-REFG-shbx-V7ib4ez-JAaos2-Dc-Q95-T6j-AC8ng-s.png"
                        alt="Hockey"
                    />
                </SwiperSlide>
                <SwiperSlide className='flex justify-center items-center'>
                    <img
                        className="object-contain h-48 w-full"
                        src="https://i.ibb.co.com/cKq44YBb/638d76aa1d4dbda2816fd95fcee8d093.webp"
                        alt="Hockey"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
       </div>
    );
};

export default Brands;