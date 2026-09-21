import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Layout from './components/Layout.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import AccountPage from './pages/AccountPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NoticePage from './pages/NoticePage.jsx'
import OrderSuccessPage from './pages/OrderSuccessPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import RedeemPage from './pages/RedeemPage.jsx'
import TermsPage from './pages/TermsPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route
          path="/checkout/:id"
          element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <CartPage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order/:orderId" element={<OrderSuccessPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/redeem" element={<RedeemPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
