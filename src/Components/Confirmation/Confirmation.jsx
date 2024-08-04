import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navigation from '../navigation/Navigation';
const Confirmation = () => {

  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('addressData'));
    setOrderData(storedOrderData);
  }, []);


  return (
    <>
    <Navigation/>
    <div className="w-full mt-10 max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
      <div className="flex flex-col items-center gap-4">
        <CircleCheckIcon className="w-16 h-16 text-green-500" />
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Thank you, {orderData.name} </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Your order will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.
          </p>
        </div>
          <Link to="/" className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white">
            Return to shopping
          </Link>
      </div>
    </div>
    </>
  );
};

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}



export default Confirmation;

Confirmation.propTypes = {
   orderData: PropTypes.object,
  };