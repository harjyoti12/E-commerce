import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ProductContext } from '../../Context/ProductContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signup, login } = useContext(ProductContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isSignUp) {
        await signup(data.user_name, data.email, data.password);
      } else {
        await login(data.email, data.password);
      }
      navigate('/');
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-md p-2 h-[100dvh] bg-white">
      <div className="flex items-center justify-center my-3">
        <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2"></div>
          <h2 className="text-2xl font-bold leading-tight">
            {isSignUp ? 'Sign up to create account' : 'Sign in to your account'}
          </h2>

          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="text-base font-medium text-gray-900">
                    User Name
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Full Name"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      name="user_name"
                      {...register('user_name', { required: isSignUp })}
                    />
                    {errors.user_name && <p className="text-red-500 text-sm">User Name is required</p>}
                  </div>
                </div>
              )}
              <div>
                <label className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    name="email"
                    {...register('email', { 
                      required: true,
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message || 'Email is required'}</p>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    placeholder="Password"
                    type="password"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    name="password"
                    {...register('password', { required: true, minLength: 6 })}
                  />
                  {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters long</p>}
                </div>
              </div>
              <p className="mt-2 text-base text-gray-600">
                {isSignUp ? (
                  <>Already have an account? <span className='font-extrabold text-black cursor-pointer' onClick={toggleForm}>Sign In</span></>
                ) : (
                  <>Don't have an account? <span className='font-extrabold text-black cursor-pointer' onClick={toggleForm}>Sign Up</span></>
                )}
              </p>
              <div className='flex flex-col gap-4'>
                <button
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
