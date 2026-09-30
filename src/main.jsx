import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'
import { PromotionsProvider } from './context/PromotionsContext.jsx'
import './index.css'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <SettingsProvider>
        <AuthProvider>
          <PromotionsProvider><CartProvider>
            <App />
          </CartProvider></PromotionsProvider>
        </AuthProvider>
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>,
)
