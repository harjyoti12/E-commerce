
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ProductProvider } from './Context/ProductContext.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProductProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </ProductProvider>
);
