// src/pages/_app.js
import React from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import '../styles/globals.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <TaskProvider>
      <Component {...pageProps} />
    </TaskProvider>
  );
}

export default MyApp;
