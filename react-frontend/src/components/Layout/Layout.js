import React from 'react';
import { Outlet } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const { getCartCount } = useCart();

  return (
    <>
      <Header cartCount={getCartCount()} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
