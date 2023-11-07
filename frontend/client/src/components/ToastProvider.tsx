'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const ToastProvider = () => {
  return (
    <ToastContainer autoClose={2000} theme='colored' position='bottom-right' />
  );
};

export default ToastProvider;
