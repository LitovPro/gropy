import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './ThemeContext'
import { GlobalStyles } from './GlobalStyles'
import App from './App'
import { registerServiceWorker } from './pwa/registerSW'

// Initialize Telegram WebApp if available
if ((window as { Telegram?: { WebApp?: { ready: () => void; expand: () => void } } }).Telegram?.WebApp) {
  const tg = (window as { Telegram: { WebApp: { ready: () => void; expand: () => void } } }).Telegram.WebApp
  tg.ready()
  tg.expand()
}

// Register service worker
if (import.meta.env.PROD) {
  registerServiceWorker()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
