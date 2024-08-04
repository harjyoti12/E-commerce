import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(ProductContext);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
