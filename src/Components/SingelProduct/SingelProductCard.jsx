import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';
import SingelCardLoader from '../Loader/SingelCardLoader'; // Adjust the import path as necessary

const SingleProductCard = () => {
  const { productId } = useParams();
  const { fetchProductById, addToCart } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const fetchedProduct = await fetchProductById(productId);
      setProduct(fetchedProduct);
      setLoading(false);
    };

    getProduct();
  }, [productId, fetchProductById]);

  if (loading) return <SingelCardLoader />;

  return (
    <section className="py-8 bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto">
        <div className="grid mt-14 p-10 grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center items-center">
            <img 
              src={product.image.url} 
              alt={product.name} 
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <p className="text-xl font-extrabold text-gray-900 dark:text-white sm:text-2xl">
                {product.price.formatted_with_symbol}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(5.0)</p>
                <a href="#" className="text-sm font-medium text-gray-900 dark:text-white underline">
                  345 Reviews
                </a>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h2>
              <div 
                className="mt-2 text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a 
                href="#" 
                className="flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Add to favorites
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  addToCart(product.id);
                }} 
                className="flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                role="button"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 12h14m-7-7v14"
                  />
                </svg>
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductCard;
