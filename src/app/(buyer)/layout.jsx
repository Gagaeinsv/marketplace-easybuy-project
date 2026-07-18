import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import FavoritesDrawer from '@/components/favorites/FavoritesDrawer';
import CheckoutModal from '@/components/checkout/CheckoutModal';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CartDrawer />
      <FavoritesDrawer />
      <CheckoutModal />
    </>
  );
}
