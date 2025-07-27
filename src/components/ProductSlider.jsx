import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ProductCard } from './ProductCard';

export const ProductSlider = ({productNum,tagName}) => {

    const [products, setProducts] = useState([]);
    const formatted = tagName.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    useEffect(() => {
      fetch('/data.json')
        .then(res => res.json())
        .then(data => {
          const flashSaleProducts = data
            .filter(product => product.tag && product.tag.includes(tagName))
            .slice(0, productNum); // Limit to first 10
          setProducts(flashSaleProducts);
        })
        .catch(err => console.error("Failed to fetch product data:", err));
    }, []);
  return (
    <section className="section">
      <div className="container">
        <div className="section_category">
          <p className="section_category_p">Today's</p>
        </div>
        <div className="section_header">
          <h3 className="section_title">{formatted}</h3>
          <p id="demo"></p>
        </div>
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                  delay: 2000,       // Time between slides in ms
                  disableOnInteraction: false, // Keep autoplay even after user swipes
                  pauseOnMouseEnter: true
                }}
                breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 }
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product?.id}>      
                        <div className="swiper-slide">
                          <ProductCard product={product} key={product.id}/>
                        </div>
                    </SwiperSlide>
            ))}    
            </Swiper>
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="container_btn">
          <Link to="/shop" className="container_btn_a">VIEW ALL PRODUCTS</Link>
        </div>
      </div>
    </section>
  )
}
