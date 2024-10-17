import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/firebase-messaging-sw.js')
//   .then((registration) => {
//     console.log('Service Worker registered with scope:', registration.scope);
//   })
//   .catch((error) => {
//     console.error('Service Worker registration failed:', error);
//   });
// } else {
//   console.error('Service Worker not supported in this browser.');
// }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <App />
  </React.Fragment>
);

reportWebVitals();
