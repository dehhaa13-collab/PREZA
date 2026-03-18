import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NotFound from './NotFound.jsx'

// Basic URL path check. Allow '/', '/index.html', and '/PREZA/' for GH Pages
const path = window.location.pathname;
const isHome = path === '/' || path === '/index.html' || path.startsWith('/PREZA') || path.endsWith('/');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isHome ? <App /> : <NotFound />}
  </StrictMode>,
)
