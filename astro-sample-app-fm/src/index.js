import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import '@astrouxds/tokens/dist/css/index.css'
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import '@astrouxds/react'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  applyPolyfills,
  defineCustomElements,
} from '@astrouxds/astro-web-components/loader'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

applyPolyfills().then(() => {
  defineCustomElements()
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
