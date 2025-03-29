import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Add base URL detection
const baseUrl = import.meta.env.BASE_URL || '/'

// Font import
const style = document.createElement('style')
style.innerHTML = `
  @font-face {
    font-family: 'LT Seada Medium';
    src: url('https://fonts.cdnfonts.com/css/lt-seada') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
`
document.head.appendChild(style)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
