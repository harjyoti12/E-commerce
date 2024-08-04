import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ProductContext } from '../../Context/ProductContext';
import { ProductCard } from "../All Files/Index";

const BestSaler = () => {
  const { Bestproducts} = useContext(ProductContext);

  return (
    <div className="bg-[#8D493A] text-card-foreground p-4 sm:p-6 lg:p-8 rounded-lg shadow-md mt-6 sm:mt-8 lg:mt-10 w-[90vw] sm:w-[80vw] mx-auto">
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col items-start justify-center mb-6 sm:mb-10 lg:mb-12 lg:w-1/3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 lg:mb-6 text-white font-[head1]">
            Best Seller Product
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 text-white font-[para]">
            Experience the pinnacle of fashion excellence. Our best-selling
            products have set trends and inspired style since 2014. Dive into a
            collection that represents the finest in design and quality.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
            See More
          </button>
        </div>
        <div className="flex items-center justify-center h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden lg:w-2/3">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            pagination={{ clickable: true }}
            className="w-full h-full"
          >
            {Bestproducts.map((item) => (
              <SwiperSlide key={item.id} className="flex justify-center items-center">
                <ProductCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BestSaler;
