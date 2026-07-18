import Header from '@/components/header/Header.jsx';
import Footer from '@/components/footer/Footer.jsx';
import CartDrawer from '@/components/cart/CartDrawer';
import FavoritesDrawer from '@/components/favorites/FavoritesDrawer';
import CheckoutModal from '@/components/checkout/CheckoutModal';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartDrawer />
      <FavoritesDrawer />
      <CheckoutModal />
    </>
  );
}
