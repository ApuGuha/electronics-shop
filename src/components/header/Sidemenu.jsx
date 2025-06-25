import { Link } from "react-router-dom";

export const Sidemenu = () => {
  return (
    <header className="header">
      <div className="container header_container">
        <div className="header_filter">
          <Link to="/category/woman-fashion" className="header_filter_link">Woman’s Fashion</Link>
          <a href="#" className="header_filter_link">Men’s Fashion</a>
          <Link to="/category/electronics" className="header_filter_link">Electronics</Link>
          <Link to="/category/home-and-lifestyle" className="header_filter_link">Home & Lifestyle</Link>
          <a href="#" className="header_filter_link">Medicine</a>
          <Link to="/category/sports-and-outdoor" className="header_filter_link">Sports & Outdoor</Link>
          <a href="#" className="header_filter_link">Baby’s & Toys</a>
          <Link to="/category/groceries-and-pets" className="header_filter_link">Groceries & Pets</Link>
          <Link to="/category/health-and-beauty" className="header_filter_link">Health & Beauty</Link>
        </div>
        <img src="./image/header.png" alt="" className="header_img" />
      </div>
    </header>
  )
}
