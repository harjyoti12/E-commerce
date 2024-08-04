import React from 'react';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  let cartClass = 'text-gray-500 dark:text-gray-400 text-sm';
  let checkoutClass = 'text-gray-500 dark:text-gray-400 text-sm';
  let paymentClass = 'text-gray-500 dark:text-gray-400 text-sm';
  let confirmationClass = 'text-gray-500 dark:text-gray-400 text-sm';

  if (location.pathname === '/cart') {
    cartClass = 'text-primary-700 dark:text-primary-500 text-sm sm:text-base md:text-lg';
  } else if (location.pathname === '/address') {
    cartClass = 'text-primary-700 dark:text-primary-500 text-sm sm:text-base md:text-lg';
    checkoutClass = 'text-primary-700 dark:text-primary-500 text-sm sm:text-base md:text-lg';
  } else if (location.pathname === '/payment') {
    cartClass = 'text-primary-700 dark:text-primary-500 text-sm sm:text-base md:text-lg';
    checkoutClass = 'text-primary-700 dark:text-primary-500 text-sm sm:text-base md:text-lg';
    paymentClass = 'text-primary-700 dark:text-primary-500 text-sm sm:text-base md:text-lg';
  } else if (location.pathname === '/confirm') {
    cartClass = 'text-primary-700 dark:text-primary-500 text-sm sm:text-base md:text-lg';
    checkoutClass = 'text-primary-700 dark:text-primary-500 text-sm sm:text-base md:text-lg';
    paymentClass = 'text-primary-700 dark:text-primary-500 text-sm sm:text-base md:text-lg';
    confirmationClass = 'text-primary-700 dark:text-primary-500 text-sm sm:text-base md:text-lg';
  }

  return (
    <div className='p-6 bg-transparent flex items-center justify-center overflow-auto scroll'>
      <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base md:text-lg">
        <li className={`after:border-1 flex items-center ${cartClass} after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}>
          <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Cart
          </span>
        </li>

        <li className={`after:border-1 flex items-center ${checkoutClass} after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}>
          <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Checkout
          </span>
        </li>

        <li className={`after:border-1 flex items-center ${paymentClass} after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}>
          <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Payment
          </span>
        </li>

        <li className={`flex shrink-0 items-center ${confirmationClass}`}>
          <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Confirmation
        </li>
      </ol>
    </div>
  );
};

export default Navigation;
