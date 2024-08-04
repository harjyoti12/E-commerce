


import React, { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import heroData from "./heroData";
import NewProduct from "../New Product/NewProduct";
import BestSaler from "../Best Saler/BestSaler";
import ShowProduct from "../ShowProduct/ShowProduct";
import Review from "../Review/Review";

const Hero = () => {
  const [heroImages, setHeroImages] = useState([]);

  const fetchAndStoreImages = useCallback(async () => {
    const storedImages = JSON.parse(localStorage.getItem('heroImages'));
    if (storedImages) {
      setHeroImages(storedImages);
    } else {
      const imagePromises = heroData.map(async (item) => {
        const response = await fetch(item.image);
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve({
              ...item,
              image: reader.result,
            });
          };
          reader.readAsDataURL(blob);
        });
      });

      const images = await Promise.all(imagePromises);
      setHeroImages(images);
      localStorage.setItem('heroImages', JSON.stringify(images));
    }
  }, []);

  useEffect(() => {
    fetchAndStoreImages();
  }, [fetchAndStoreImages]);

  return (
    <>
      <section className="w-full h-screen p-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-full h-full"
        >
          {heroImages.map((item) => (
            <SwiperSlide
              key={item.id}
              className="relative flex items-center justify-center h-full text-white"
              style={{ backgroundColor: item.color }}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-20 max-w-screen-xl px-4 py-8 mx-auto text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2">
                  <h1 className="max-w-2xl font-[head1] mb-4 lg:mb-20 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl sm:text-3xl">
                    {item.caption}
                  </h1>
                  <div>
                    <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 lg:py-3 lg:px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
                      {item.buttonLabel}
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
                  <img
                    src={item.image}
                    alt="mockup"
                    className="w-full h-[70vh] object-cover rounded-l-[2.5rem] bg-opacity-5 hidden lg:block"
                  />
                  <div
                    className="lg:hidden absolute top-0 left-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      zIndex: "-1",
                      opacity: 0.5,
                    }}
                  ></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <React.Suspense fallback={<div>Loading...</div>}>
        <NewProduct />
        <BestSaler />
        <ShowProduct />
        <Review />
      </React.Suspense>
    </>
  );
};

export default React.memo(Hero);
