import React from 'react';
import img from "./img/product_10.png";
import img2 from "./img/product_20.png";
import img3 from "./img/product_36.png";

const NewProduct = () => {
  return (
    <>
      <div className='w-full h-auto flex flex-col justify-between items-center p-4 lg:p-10 m-2 overflow-hidden bg-[#F6F5F5]'>
        <h1 className='font-extrabold text-3xl lg:text-4xl xl:text-5xl font-[head1] text-black mb-4 lg:mb-6'>New Collection</h1>
        <p className="text-center text-sm lg:text-base xl:text-lg text-muted-foreground mb-6 lg:mb-8 font-[para]">
          Discover the latest trends in our new collection, featuring stylish and modern designs to elevate your wardrobe.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-6 cursor-pointer'>
          <div className='w-full bg-red-300 transition-all transform hover:scale-105 hover:shadow-lg'>
            <img src={img} className='w-full h-60 md:h-72 lg:h-80 object-cover object-top' alt="Product 1" />
          </div>
          <div className='w-full bg-red-300 transition-all transform hover:scale-105 hover:shadow-lg'>
            <img src={img2} className='w-full h-60 md:h-72 lg:h-80 object-cover object-top' alt="Product 2" />
          </div>
          <div className='w-full bg-red-300 transition-all transform hover:scale-105 hover:shadow-lg'>
            <img src={img3} className='w-full h-60 md:h-72 lg:h-80 object-cover object-top' alt="Product 3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
