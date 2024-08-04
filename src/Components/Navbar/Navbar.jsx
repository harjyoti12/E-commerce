import React, { useContext, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/commerce.png";
import { Link } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import PropTypes from 'prop-types';

const Navbar = () => {
  const { cart, user, logout } = useContext(ProductContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calculate total items in cart
  const totalItems = cart && cart.total_items ? cart.total_items : 0;

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-gray-200 bg-[#FFF8F3] p-4 fixed z-[999] w-full">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between font-[para]">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Kalita Store Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black max-sm:text-xl">
            Kalita Store
          </span>
        </Link>

        {/* Cart Icon for Small Screens */}
        <div className="lg:hidden flex items-center space-x-6">
          <Link to="/cart" className="relative">
            <FaShoppingCart
              className="text-black hover:text-blue-700 dark:hover:text-blue-500"
              size={24}
            />
            {cart && (
              <span className="absolute top-[-.5rem] right-[-.8rem] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="text-black hover:text-blue-700 dark:hover:text-blue-500 lg:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full cursor-pointer lg:flex lg:items-center lg:space-x-6 lg:w-auto mt-4 lg:mt-0`}
        >
          <Link
            to="/"
            className="block lg:inline-block text-black hover:text-blue-700 dark:hover:text-blue-500"
          >
            Home
          </Link>
          <p className="block lg:inline-block text-black hover:text-blue-700 dark:hover:text-blue-500">
            Categories
          </p>
          <p className="block lg:inline-block text-black hover:text-blue-700 dark:hover:text-blue-500">
            Blog
          </p>
          <p className="block lg:inline-block text-black hover:text-blue-700 dark:hover:text-blue-500">
            Contact
          </p>

          {/* Cart Icon for Large Screens */}
          <div className="hidden lg:block">
            <Link to="/cart" className="relative">
              <FaShoppingCart
                className="text-black hover:text-blue-700 dark:hover:text-blue-500"
                size={24}
              />
              {cart && (
                <span className="absolute top-[-.5rem] right-[-.8rem] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
          {user ? (
            <button
              onClick={logout}
              className="block w-full lg:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full lg:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  cart: PropTypes.object,
  totalItems: PropTypes.number
};

export default Navbar;
