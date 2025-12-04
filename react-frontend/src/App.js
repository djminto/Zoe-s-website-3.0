import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ChatbotProvider } from './context/ChatbotContext';
import Chatbot from './components/Chatbot/Chatbot';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnsRefunds from './pages/ReturnsRefunds';
import ShippingPolicy from './pages/ShippingPolicy';
import FAQ from './pages/FAQ';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ChatbotProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <GlobalStyles />
            <Chatbot />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="profile" element={<Profile />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="terms" element={<TermsConditions />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="returns" element={<ReturnsRefunds />} />
                <Route path="shipping" element={<ShippingPolicy />} />
                <Route path="faq" element={<FAQ />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </Router>
        </ChatbotProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
