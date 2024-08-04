
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import { ProductContext } from "../../Context/ProductContext";
import { loadStripe } from "@stripe/stripe-js";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
  const { cart,  refreshCart } = useContext(ProductContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // Add useNavigate hook
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  const cartItems = cart?.line_items || [];
  const originalPrice = (
    cart?.subtotal.formatted_with_symbol || "0"
  ).toString();
  const amount =
    parseFloat(originalPrice.replace("₹", "").replace(",", "")) * 100; // Convert to paise
  const savings = 0;
  const storePickupFee = 0;
  const tax = 0;

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "IN",
      currency: "inr",
      total: {
        label: "Total",
        amount: amount, // Convert to paise
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe, amount]);

  useEffect(() => {
    if (paymentSuccess) {
      toast.success('Your Transaction is Completed'); // Show success toast
      refreshCart();
      setTimeout(() => {
        navigate("/confirm");
      }, 1000); // Delay navigation by 3 seconds to show success message
    }
  }, [paymentSuccess, navigate,refreshCart]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    setIsProcessing(true);
  
    const cardElement = elements.getElement(CardNumberElement);
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
  
    if (error) {
      setError(error.message);
      setIsProcessing(false);
      return;
    }
  
    const shippingData = JSON.parse(localStorage.getItem("addressData")) || {};
    const {
      name = "John",
      email = "john.doe@example.com",
      city = "San Francisco",
      state = "CA",
      zipcode = "94111",
      country = "US",
    } = shippingData;
  
    const orderData = {
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price.formatted_with_symbol,
      })),
      customer: {
        name,
        email,
      },
      shipping: {
        name: `${name}` || name,
        town_city: city,
        county_state: state,
        postal_zip_code: zipcode,
        country,
      },
      total: originalPrice,
      payment: {
        payment_method_id: paymentMethod.id,
      },
    };
  
    // Simulating successful payment process
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      localStorage.setItem('orderData', JSON.stringify(orderData)); // Store orderData in localStorage
    }, 4000);
  };
  

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 h-[100vh] md:py-16">
      <Navigation />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 border p-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl text-center">
            Payment
          </h2>
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            {paymentSuccess ? (
              // Success message will be shown by toast
              <div className="w-full flex items-center justify-center">
                <p className="text-green-500 text-lg">Transaction completed successfully!</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
              >
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="full_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Full name (as displayed on card)*
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="Bonnie Green"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="card-number-input"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Card number*
                    </label>
                    <CardNumberElement className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" />
                  </div>
                </div>
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="cvv"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      CVV*
                    </label>
                    <CardCvcElement
                      type="text"
                      id="cvv"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="123"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="expiry-date"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Expiry Date*
                    </label>
                    <CardExpiryElement
                      type="text"
                      id="expiry-month"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                </div>
                {paymentRequest && (
                  <div className="mb-6">
                    <PaymentRequestButtonElement options={{ paymentRequest }} />
                  </div>
                )}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Pay now"}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form> 
            )}

            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                 <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                     <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                       Original price
                     </dt>
                     <dd className="text-base font-medium text-gray-900 dark:text-white">
                       {originalPrice}
                     </dd>
                   </dl>
                   <dl className="flex items-center justify-between gap-4">
                     <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                       Savings
                     </dt>
                     <dd className="text-base font-medium text-gray-900 dark:text-white">
                       -₹{savings}
                     </dd>
                   </dl>
                   <dl className="flex items-center justify-between gap-4">
                     <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                       Store pickup fee
                     </dt>
                     <dd className="text-base font-medium text-gray-900 dark:text-white">
                       ₹{storePickupFee}
                     </dd>
                   </dl>
                   <dl className="flex items-center justify-between gap-4">
                     <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                       Tax
                     </dt>
                     <dd className="text-base font-medium text-gray-900 dark:text-white">
                       ₹{tax}
                     </dd>
                   </dl>
                 </div>
                 <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                   <dl className="flex items-center justify-between text-base font-medium text-gray-900 dark:text-white">
                     <dt>Total</dt>
                     <dd>{originalPrice}</dd>
                   </dl>
                 </div>
               </div>
               <div className="mt-6 flex items-center justify-center gap-8">
                <img
                  className="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                  alt=""
                />
                <img
                  className="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                  alt=""
                />
                <img
                  className="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                  alt=""
                />
                <img
                  className="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                  alt=""
                />
                <img
                  className="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                  alt=""
                />
                <img
                  className="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          </div>
        </div>

    </section>
  );
};

const StripeWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default StripeWrapper;
