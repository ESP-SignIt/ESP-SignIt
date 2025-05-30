import React from 'react';
import '../styles/loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <span className="loader"></span>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader; 