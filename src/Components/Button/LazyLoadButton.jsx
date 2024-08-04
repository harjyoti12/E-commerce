// src/components/Button/LazyLoadButton.js
import React from "react";

const LazyLoadButton = ({ onClick }) => (
  <button onClick={onClick} className="rounded-md bg-black px-5 py-2.5 text-center text-sm font-medium text-white">
    Show More
  </button>
);

export default LazyLoadButton;
