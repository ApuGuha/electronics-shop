// Header.jsx
import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {

  const { wishList } = useWishlist();
  const {cartItems} = useCart();
  const { user, logout} = useAuth();
  return (
    <>
      <div className="top_nav">
        <div className="container top_nav_container">
          <div className="top_nav_wrapper">
            <p className="tap_nav_p">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            </p>
            <Link to="/" className="top_nav_link">SHOP NOW</Link>
          </div>
        </div>
      </div>

      <nav className="nav">
        <div className="container nav_container">
          <Link to="/" className="nav_logo">EXCLUSIVE</Link>
          <ul className="nav_list">
            <li className="nav_item"><Link to="/" className="nav_link">Home</Link></li>
            <li className="nav_item"><Link to="/about" className="nav_link">About</Link></li>
            <li className="nav_item"><Link to="/contact" className="nav_link">Contact</Link></li>
            <li className="nav_item"><Link to="/signup" className="nav_link">Sign up</Link></li>
          </ul>
          <div className="nav_items">
            <form action="#" className="nav_form">
              <input type="text" className="nav_input" placeholder="search here...." />
              <img src="./image/search.png" alt="" className="nav_search" />
            </form>
            <Link to="/wishlist"><img src="./image/heart.png" alt="" className="nav_heart" />
            {wishList.length > 0 && `(${wishList.length})`}</Link>
            <Link to="/cart"><img src="./image/cart.png" alt="" className="nav_cart" />
            {cartItems.length > 0 && `(${cartItems.length})`}</Link>
            {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
            ) : (
            <>
              <Link to="/login" className="nav_link">Login</Link>
            </>
        )}
          </div>
          <span className="hamburger">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </span>
        </div>
      </nav>

      <nav className="mobile_nav mobile_nav_hide">
        <ul className="mobile_nav_list">
          <li className="mobile_nav_item"><Link to="/" className="mobile_nav_link">Home</Link></li>
          <li className="mobile_nav_item"><Link to="/about" className="mobile_nav_link">About</Link></li>
          <li className="mobile_nav_item"><Link to="/contact" className="mobile_nav_link">Contact</Link></li>
          <li className="mobile_nav_item"><Link to="/cart" className="mobile_nav_link">Cart</Link></li>
        </ul>
      </nav>
    </>
  );
};
