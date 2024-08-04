import React from 'react';
import { Footer, Hero, Navbar, SingelProductCard, Cart, AdressForm, PaymentForm, Confirmation, LoginForm } from './Components/All Files/Index';
import { Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './Components/Route/PrivateRoute'; 
const App = () => {
  const location = useLocation();
  const hideNavbarFooter = ['/cart', '/address', '/payment', '/confirm', '/login'].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/single/:productId" element={<SingelProductCard />} />
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />
        <Route path="/address" element={<AdressForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/confirm" element={<Confirmation />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

export default App;
