import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import { Header } from './components/header/Header';
import { Sidemenu } from './components/header/Sidemenu';
import { Footer } from './components/Footer';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact'; 
import { Shop } from "./components/pages/Shop";
import { WishlistProvider } from "./components/contexts/WishlistContext";
import { WishList } from "./components/pages/WishList";
import { CartProvider } from "./components/contexts/CartContext";
import { Cart } from "./components/pages/Cart";

function LayoutWrapper()
{
  const location = useLocation();
  const isHome = location.pathname === "/";

  return(
    <>
    <Header/>
    {isHome && <Sidemenu/>}
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element= {<WishList/>}/>
        <Route path="/cart" element= {<Cart/>}/>
        {/* Optional: 404 page */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
    <Footer/>
    </>
  )
}

function App() {

  return (
    <>
    <WishlistProvider>
      <CartProvider>
        <Router>
          <LayoutWrapper/>
        </Router>
      </CartProvider>
    </WishlistProvider>
    </>
  )
}

export default App
