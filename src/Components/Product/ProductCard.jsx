import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ item }) => {
  const { addToCart } = useContext(ProductContext);

  return (
    <div className="relative aspect flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md w-full">
      <Link to={`/single/${item.id}`} className="relative flex h-48 overflow-hidden rounded-t-lg" aria-label={`View details of ${item.name}`}>
        <img className="object-cover w-full h-full" src={item.image.url} alt={`Image of ${item.name}`} />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
      </Link>
      <div className="p-4">
        <Link to={`/single/${item.id}`} aria-label={`View details of ${item.name}`}>
          <h5 className="text-lg font-semibold tracking-tight text-slate-900">{item.name}</h5>
        </Link>
        <div className="mt-2 mb-4 flex items-center justify-between">
          <p>
            <span className="text-lg text-slate-900">{item.price.formatted_with_symbol}</span>
          </p>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg key={index} aria-hidden="true" className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigation
            addToCart(item.id, 1); // Pass the product ID and quantity
          }}
          className="flex items-center justify-center w-full rounded-md bg-slate-900 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label={`Add ${item.name} to cart`}
        >
          <FaShoppingCart className='mr-2 h-5 w-5' />
          Add to cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProductCard;
