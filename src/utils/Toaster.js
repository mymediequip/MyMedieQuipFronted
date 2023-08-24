import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toaster = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000} // Adjust the time the toast stays visible (in milliseconds)
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
    />
  );
};

export { Toaster, toast };
