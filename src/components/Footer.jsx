import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <img src="/image/red-nexa-logo.png" alt="logo" className="header_logo" />
          <h4>Subscribe</h4>
          <div className="footer-mail">
            <p>Get 10% off your first order</p>
            <div className="subscribe-box">
              <input type="email" placeholder="Enter your email" required/>
              <button>
                <img
                  src="image/icons/icon-send.png"
                  width="24px"
                  height="24px"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <p>
            F-1, Shop No 12, Sector 9, Near Shabari Hotel, Vashi, Navi Mumbai
          </p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Login/Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/shop">Shop</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Quick Link</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-use">Terms Of Use</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Social Links</h4>
          <div className="social-icons">
            <Link to="#"><img src="image/icons/Icon-Facebook.png" width="22" height="22" alt=""/></Link>
            <Link to="#"><img src="image/icons/Icon-Twitter.png"width="22" height="24" alt=""/></Link>
            <Link to="#"><img src="image/icons/icon-instagram.png"width="22" height="22" alt=""/></Link>
            <Link to="#"><img src="image/icons/Icon-Linkedin.png" width="22" height="22" alt=""/></Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Copyright Rimel 2022. All right reserved</p>
      </div>
    </footer>
  )
}
