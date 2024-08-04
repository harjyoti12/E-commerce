import React, { useContext } from "react";
import LazyLoadButton from "../Button/LazyLoadButton";
import { ProductContext } from "../../Context/ProductContext";
import Review from "../Review/Review";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const ShowProduct = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    handleLoadMore,
    addToCart,
    isLoading,
  } = useContext(ProductContext);

  return (
    <>
      <div className="w-full bg-[#F6F5F5] flex flex-col justify-start items-center p-4 sm:p-8 lg:p-10">
        <div className="w-full max-w-3xl flex flex-col justify-center items-center">
          <h1 className="font-semibold text-black text-[2rem] sm:text-[2.8rem] font-[head1]">
            Our Product
          </h1>
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-10 font-medium mt-4 cursor-pointer font-[head1]">
            {categories.map((category) => (
              <li
                key={category}
                className={selectedCategory === category ? "underline" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        {isLoading ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-8 lg:p-10">
            {Array.from({ length: 8 }).map((_, index) => (
              <Loader key={index} />
            ))}
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-8 lg:p-10">
            {products.map((item) => (
              <div
                key={item.id}
                className="relative m-4 sm:m-6 lg:m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
              >
                <Link
                  to={`/single/${item.id}`}
                  className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                  aria-label={`View details of ${item.name}`}
                >
                  <img
                    className="object-cover mt-4 w-full"
                    src={item.image.url}
                    alt={`Image of ${item.name}`}
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    39% OFF
                  </span>
                </Link>
                <div className="mt-4 px-5 pb-5 ">
                  <Link to={`/single/${item.id}`} aria-label={`View details of ${item.name}`}>
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {item.name}
                    </h5>
                  </Link>
                  <div className="mt-2 mb-5 flex items-center justify-between overflow-x-auto scroll">
                    <p>
                      <span className="text-3xl font-bold text-slate-900">
                        {item.price.formatted_with_symbol}
                      </span>
                    </p>
                    <div className="flex items-center pr-4">
                      {Array(5)
                        .fill("")
                        .map((_, index) => (
                          <svg
                            key={index}
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                        5.0
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents navigation
                      addToCart(item.id, 1); // Pass the product ID and quantity
                    }}
                    className="flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <FaShoppingCart className="mr-2 h-4 w-6" />
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {products.length > 0 && <LazyLoadButton onClick={handleLoadMore} />}
      </div>
    </>
  );
};

export default ShowProduct;
