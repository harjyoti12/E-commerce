import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Navigation from "../navigation/Navigation";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddressForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate(); // Hook for navigation
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    value: "IN",
    label: "India",
    code: "+91",
  });
  const [selectedState, setSelectedState] = useState(null);
  useEffect(() => {
    const initialStates = State.getStatesOfCountry("IN").map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
    setStates(initialStates);
    setValue("country", "India");
  }, [setValue]);

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    const citiesList = City.getCitiesOfState(
      selectedCountry.value,
      selectedOption.value
    ).map((city) => ({
      value: city.name,
      label: city.name,
    }));
    setCities(citiesList);
    setValue("state", selectedOption.label);
  };

  const handleCityChange = (selectedOption) => {
    setValue("city", selectedOption.label);
  };

  const onSubmit = (data) => {
    // Store the form data into local storage
    localStorage.setItem("addressData", JSON.stringify(data));
    // Proceed to payment page only if form is valid
    navigate("/payment");
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md min-h-screen flex flex-col items-center">
      <Navigation />
      <div className="w-full max-w-3xl border mt-6 p-6 md:p-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-foreground text-center mb-6">
          Delivery Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-muted-foreground mb-1"
                htmlFor="name"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="border border-border rounded-md p-2 w-full bg-background text-foreground"
                placeholder="Bonnie Green"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-muted-foreground mb-1"
                htmlFor="email"
              >
                Your email*
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="border border-border rounded-md p-2 w-full bg-background text-foreground"
                placeholder="name@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-muted-foreground mb-1"
                htmlFor="country"
              >
                Country*
              </label>
              <Select
                id="country"
                value={selectedCountry}
                isDisabled
                className="w-full bg-transparent text-foreground"
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-muted-foreground mb-1"
                htmlFor="state"
              >
                State*
              </label>
              <Select
                id="state"
                options={states}
                onChange={handleStateChange}
                className="w-full bg-transparent text-foreground"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-muted-foreground mb-1"
                htmlFor="city"
              >
                City*
              </label>
              <Select
                id="city"
                options={cities}
                onChange={handleCityChange}
                className="w-full bg-transparent text-foreground"
                isDisabled={!selectedState}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-muted-foreground mb-1"
                htmlFor="phone"
              >
                Phone Number*
              </label>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  id="country-code"
                  {...register("countryCode", {
                    required: "Country code is required",
                  })}
                  className="border border-border rounded-md p-2 w-full md:w-1/4 bg-background text-foreground"
                  placeholder="+91"
                  defaultValue={selectedCountry.code} // Set the default value to the country code
                />
                <input
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{3}\d{3}\d{4}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="border border-border rounded-md p-2 w-full md:w-3/4 bg-background text-foreground"
                  placeholder="1234567890"
                />
              </div>
              {errors.countryCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.countryCode.message}
                </p>
              )}
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between mt-6">
            <button
              type="submit"
              className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
            >
              Proceed to Payment
            </button>
            <Link
              to="/"
              type="button"
              className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4 md:ml-4"
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
