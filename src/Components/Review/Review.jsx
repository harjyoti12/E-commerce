import React from 'react';
import Reviewdata from './Reviewdata';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Review = () => {
  return (
    <div className='w-full flex flex-col items-center p-6 bg-white'>
      <div className='w-full max-w-5xl px-4'>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#973131] text-center">
          What People Say About Us
        </h1>
      </div>
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          className="w-full"
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: {
              slidesPerView: 1, // Show 1 slide for small screens
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 2, // Show 2 slides for larger screens
              spaceBetween: 24,
            },
          }}
        >
          {Reviewdata.map((item) => (
            <SwiperSlide key={item.id} className="flex justify-center items-center">
              <div className="bg-[#F8EDE3] aspect-square w-full max-w-md p-6 rounded-lg shadow-md flex flex-col items-center">
                <h1 className='font-semibold text-xl md:text-2xl text-center text-[#973232]'>
                  {item.heading}
                </h1>
                <p className="text-center mt-4 text-[#973131] text-sm md:text-base">
                  {item.text}
                </p>
                <img
                  src={item.image}
                  alt={`${item.name}'s picture`}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full mt-4"
                />
                <p className="font-bold text-[#973131] mt-2 text-sm md:text-base">
                  {item.name}
                </p>
                <p className="text-[#973131] text-sm md:text-base">
                  {item.role}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
