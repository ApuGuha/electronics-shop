import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
  const { wishList } = useWishlist();
  const { cartItems, loading } = useCart();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileNav = document.querySelector(".mobile_nav");
      const hamburger = document.querySelector(".hamburger");

      if (
        isMobileMenuOpen &&
        mobileNav &&
        !mobileNav.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLoginRedirect = () => {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    navigate("/login");
  };

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      if (searchTerm.trim()) {
        try {
          const response = await fetch("/data.json");
          const data = await response.json();
          const filtered = data.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredResults(filtered);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      } else {
        setFilteredResults([]);
      }
    };

    fetchAndFilterProducts();
  }, [searchTerm]);

  const handleProductClick = (productId) => {
    setSearchTerm("");
    setFilteredResults([]);
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className="top_nav">
        <div className="container top_nav_container">
          <div className="top_nav_wrapper">
            <p className="tap_nav_p">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            </p>
            <Link to="/" className="top_nav_link">
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      <nav className="nav">
        <div className="container nav_container">
          <Link to="/" className="nav_logo">
            <img src="/image/nexa-logo.png" alt="logo" className="header_logo" />
          </Link>
          <ul className="nav_list">
            <li className="nav_item">
              <Link to="/" className="nav_link">
                Home
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/shop" className="nav_link">
                Shop
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/about" className="nav_link">
                About
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/contact" className="nav_link">
                Contact
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/signup" className="nav_link">
                Sign up
              </Link>
            </li>
          </ul>

          <div className="nav_items">
            <div className="nav_form_wrapper" style={{ position: "relative" }}>
              <form className="nav_form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  className="nav_input"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src="/image/search.png" alt="" className="nav_search" />
              </form>

              {filteredResults.length > 0 && (
                <ul className="search_dropdown">
                  {filteredResults.map((product) => (
                    <li
                      key={product.id}
                      className="search_dropdown_item"
                      onClick={() => handleProductClick(product.slug)}
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link to="/wishlist" className="nav_wish_link">
              <img src="/image/heart.png" alt="" className="nav_heart" />
              {!loading && wishList.length > 0 && (
                <span className="wishList_count">{wishList.length}</span>
              )}
            </Link>

            <Link to="/cart" className="nav_cart_link">
              <img src="/image/cart.png" alt="Cart" className="nav_cart" />
              {!loading && cartItems.length > 0 && (
                <span className="cart_count">{cartItems.length}</span>
              )}
            </Link>

            {user ? (
              <button onClick={logout} className="user_logout">
                {user.name.slice(0, 2).toUpperCase()}
              </button>
            ) : (
              <button onClick={handleLoginRedirect} className="login_link">
                Login
              </button>
            )}
          </div>

          <span className="hamburger" onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
        </div>
      </nav>

      <nav className={`mobile_nav ${isMobileMenuOpen ? "mobile_nav_show" : "mobile_nav_hide"}`}>
        <div className="mobile_nav_header">
          <span className="mobile_nav_close" onClick={closeMobileMenu}>
            &times;
          </span>
        </div>
        <ul className="mobile_nav_list">
          <li className="mobile_nav_item">
            <Link to="/" className="mobile_nav_link" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="mobile_nav_item">
            <Link to="/shop" className="mobile_nav_link" onClick={closeMobileMenu}>
              Shop
            </Link>
          </li>
          <li className="mobile_nav_item">
            <Link to="/about" className="mobile_nav_link" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li className="mobile_nav_item">
            <Link to="/contact" className="mobile_nav_link" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
          <li className="mobile_nav_item">
            <Link to="/cart" className="mobile_nav_link" onClick={closeMobileMenu}>
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
