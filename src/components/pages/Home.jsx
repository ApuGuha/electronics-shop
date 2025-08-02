
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductList } from "../ProductList";
import { ProductSlider } from "../ProductSlider";
import { ProductGallery } from "../ProductGallery";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
        fetch('/data.json')
        .then(res => res.json())
        .then(data => {
          const firstEight = data.slice(0, 8); // Only take first 8 items
          setProducts(firstEight);
        })
        .catch((err) => console.error("Error loading products:", err));

    }, []);
  return (
    <>
      <ProductSlider productNum={8} tagName={"flash-sale"}/>
      <section className="section">
      <div className="container">
        <div className="section_category">
          <p className="section_category_p">categories</p>
        </div>
        <div className="section_header">
          <h3 className="section_title">Browse by Category</h3>
        </div>
        <div className="categories">
          <div className="category">
            <img src="/image/icons/camera.png" alt="" className="category_icon" />
            <p className="category_name">Cameras</p>
          </div>
          <div className="category">
            <img
              src="/image/icons/computer.png"
              alt=""
              className="category_icon" />
            <p className="category_name">Computers</p>
          </div>
          <div className="category">
            <img src="/image/icons/gaming.png" alt="" className="category_icon" />
            <p className="category_name">Gaming</p>
          </div>
          <div className="category">
            <img
              src="/image/icons/headphone.png"
              alt=""
              className="category_icon" />
            <p className="category_name">Headphones</p>
          </div>
          <div className="category">
            <img src="/image/icons/phone.png" alt="" className="category_icon" />
            <p className="category_name">Phones</p>
          </div>
          <div className="category">
            <img src="/image/icons/watch.png" alt="" className="category_icon" />
            <p className="category_name">Watches</p>
          </div>
        </div>
      </div>
    </section>
      <ProductSlider productNum={8} tagName={"best-seller"}/>
      <section className="section">
        <div className="container">
          <div className="trending">
            <div className="trending_content">
              <p className="trending_p">categories</p>
              <h2 className="trending_title">Enhance Your Music Experience</h2>
              <Link to="/category/electronics" className="trending_btn">Buy Now!</Link>
            </div>
            <img src={`${import.meta.env.VITE_SITE_URL}/image/speaker.png`} alt="" className="trending_img" />
          </div>
        </div>
      </section>
      <section className="section">
      <div className="container">
        <div className="section_category">
          <p className="section_category_p">Our Products</p>
        </div>
        <div className="section_header">
          <h3 className="section_title">Explore Our Products</h3>
          <p id="demo"></p>
        </div>
        <div className="products">
          <ProductList products={products} />
        </div>
        <div className="container_btn">
          <Link to="/shop" className="container_btn_a">VIEW ALL PRODUCTS</Link>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="section_category">
          <p className="section_category_p">Featured</p>
        </div>
        <div className="section_header">
          <h3 className="section_title">New Arrivals</h3>
        </div>
        <ProductGallery tagName={"playstation"}/>
      </div>
    </section>
    <section className="section">
      <div className="container services_container">
        <div className="service">
          <img src={`${import.meta.env.VITE_SITE_URL}/image/icons/service-1.png`} alt="" className="service_img" />
          <h3 className="service_title">FAST AND FREE DELIVERY</h3>
          <p className="service_p">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div className="service">
          <img src={`${import.meta.env.VITE_SITE_URL}/image/icons/service-2.png`} alt="" className="service_img" />
          <h3 className="service_title">24/7 SUPPORT</h3>
          <p className="service_p">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div className="service">
          <img src={`${import.meta.env.VITE_SITE_URL}/image/icons/service-3.png`} alt="" className="service_img" />
          <h3 className="service_title">MONEY BACK GUARANTY</h3>
          <p className="service_p">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
    </section>
    </>
  )
}
