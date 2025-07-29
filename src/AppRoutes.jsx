import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";import { Header } from './components/header/Header';
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
import Signup from "./components/pages/Signup";
import { Login } from "./components/pages/Login";
import { useAuth } from "./components/contexts/AuthContext";
import { CategoryPage } from "./components/pages/CategoryPage";
import { ProductPage } from "./components/pages/ProductPage";
import { Checkout } from "./components/pages/Checkout";
import { Privacypolicy } from "./components/pages/Privacypolicy";
import { Termsofuse } from "./components/pages/Termsofuse";
import { Breadcrumb } from "./components/Breadcrumb";

function LayoutWrapper()
{
  const location = useLocation();
  const isHome = location.pathname === "/";
  const hiddenBreadcrumbPaths = ["/login", "/signup", "/404", "/"];
  const isBreadcrumbVisible = !hiddenBreadcrumbPaths.includes(location.pathname) && !location.pathname.startsWith("/404");
  
  

  return(
    <>
    <Header/>
    {isHome && <Sidemenu/>}

    {/* Show breadcrumb only when path is NOT in the excluded list */}
    {isBreadcrumbVisible && <Breadcrumb />}
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element= {<WishList/>}/>
        <Route path="/cart" element= {<Cart/>}/>
        <Route path="/signup" element= {<Signup/>}/>
        <Route path="/login" element= {<Login/>}/>
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:slug" element={<ProductPage/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/privacy-policy" element={<Privacypolicy/>}/>
        <Route path="/terms-of-use" element={<Termsofuse/>}/>
        {/* Optional: 404 page */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
    <Footer/>
    </>
  )
}
export const AppRoutes = () => {
  

    const { user } = useAuth();
    const userId = user ? user.email : null;
  return (
    <>
    <WishlistProvider userId={userId}>
        <CartProvider userId={userId}>
          <Router>
            <LayoutWrapper/>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </>
  )
}
