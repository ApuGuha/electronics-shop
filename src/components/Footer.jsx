import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer_container">
        <div className="footer_item">
          <a href="#" className="footer_logo">Exclusive</a>
          <div className="footer_p">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Exercitationem fuga harum voluptate?
          </div>
        </div>
        <div className="footer_item">
          <h3 className="footer_item_titl">Support</h3>
          <ul className="footer_list">
            <li className="li footer_list_item">Stockholm, Sweden</li>
            <li className="li footer_list_item">email@gmail.com</li>
            <li className="li footer_list_item">+46 123 456 78</li>
            <li className="li footer_list_item">+46 72 345 67</li>
          </ul>
        </div>
        <div className="footer_item">
          <h3 className="footer_item_titl">Support</h3>
          <ul className="footer_list">
            <li className="li footer_list_item">
                <Link to="/signup">Sign up</Link>
            </li>
            <li className="li footer_list_item">
                <Link to="/cart">Cart</Link>
            </li>
            <li className="li footer_list_item">
                <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </div>
        <div className="footer_item">
          <h3 className="footer_item_titl">Support</h3>
          <ul className="footer_list">
            <li className="li footer_list_item">
                <Link to="/privacy-policy">Privacy policy</Link>
            </li>
            <li className="li footer_list_item">
                <Link to="/terms-of-use">Terms of use</Link>
            </li>
            <li className="li footer_list_item">
                <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer_bottom">
        <div className="container footer_bottom_container">
          <p className="footer_copy">
            Copyright Exclusive 2023. All right reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
