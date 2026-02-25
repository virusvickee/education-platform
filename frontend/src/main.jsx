import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootEl = document.getElementById('root');

if (!rootEl) {
  console.error('Failed to find root element. Ensure index.html contains <div id="root"></div>');
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
