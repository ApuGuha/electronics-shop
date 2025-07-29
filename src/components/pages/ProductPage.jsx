import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from "swiper/modules";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

export const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setProduct(found);
      });
  }, [id]);

  const handleAddToCart = () => {
  const hasColor = Array.isArray(product.color) && product.color.length > 0;
  const hasSize = Array.isArray(product.size) && product.size.length > 0;

  // Validate based on available options
  if (hasColor && !selectedColor) {
    alert('Please select a color');
    return;
  }
  if (hasSize && !selectedSize) {
    alert('Please select a size');
    return;
  }

  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    color: hasColor ? selectedColor : null,
    size: hasSize ? selectedSize : null,
    quantity: Number(quantity),
  };

  addToCart(cartItem);
};

  if (!product) return <div>Loading product...</div>;

  return (
    <>
      <section className="pdp-container-box">
        <div className="container">
          <div className="product-image" style={{ display: "flex", gap: "20px", flexDirection: isMobile ? 'column' : 'row' }}>
            {/* Thumbnails */}
            <div className="controller-max" style={{ width: isMobile ? "100%" : "100px" }}>
              <Swiper
                  onSwiper={setThumbsSwiper}
                  direction={isMobile ? 'horizontal' : 'vertical'}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                  style={{ height: isMobile ? 'auto' : '400px' }}
                >
                {product.image.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="ratio ratio-4x3">
                      <img src={src} alt={`thumb-${index}`} style={{ width: "100%", borderRadius: 4 }} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Main Slider */}
            <div className="content-max" style={{ flex: 1 }}>
              <Swiper
                thumbs={{ swiper: thumbsSwiper }}
                slidesPerView={1}
                modules={[Thumbs]}
              >
                {product.image.map((src, index) => (
                  <SwiperSlide key={index}>
                    <Zoom>
                      <img src={src} alt={`slide-${index}`} style={{ width: "100%", borderRadius: 6 }} />
                    </Zoom>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="product-info">
            <h2>{product.name}</h2>
            <div className="stars">
              ⭐<span>{product.rating}</span> |{' '}
              <span style={{ color: '#00FF66' }}>In Stock</span>
            </div>
            <div className="price">₹{product.price}</div>
            <p>{product.description}</p>

            {/* Color Selection */}
            {product.color?.length > 0 && (
              <div className="color-options">
                <h5>Colours:</h5>
                {product.color.map((clr, i) => (
                  <label
                    key={i}
                    style={{
                      padding: '4px 8px',
                      marginRight: '10px',
                      border: selectedColor === clr ? '1px solid #db4444' : '1px solid #db4444',
                      backgroundColor: selectedColor === clr ? '#db4444' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={clr}
                      checked={selectedColor === clr}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    {clr}
                  </label>
                ))}
              </div>
            )}

            {/* Size Selection */}
            {product.size?.length > 0 && (
              <div className="size-options">
                <h5>Size:</h5>
                <div className="size-inputs">
                  {product.size.map((sz, i) => (
                    <label
                      key={i}
                      htmlFor={`size-${sz}`}
                      style={{
                        padding: '4px 8px',
                        marginRight: '10px',
                        border: selectedSize === sz ? '1px solid #db4444' : '1px solid #db4444',
                        backgroundColor: selectedSize === sz ? '#db4444' : 'transparent',
                        color : selectedSize === sz ? '#ffffff' : '#000000',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        id={`size-${sz}`}
                        name="size"
                        value={sz}
                        checked={selectedSize === sz}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        style={{ display: 'none' }}
                      />
                      {sz}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="product-action-area">
              <div className="quantity-wrapper">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  −
                </button>
                <input
                  type="number"
                  id="qty"
                  value={quantity}
                  min="1"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setQuantity(!isNaN(value) && value > 0 ? value : 1);
                  }}
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="buy-now" onClick={handleAddToCart}>
                Buy Now
              </button>
            </div>

            <div className="info-box">
              <img src="/image/icons/icon-delivery.png" alt="" />
              <div className="info-text">
                <span className="info-title">Free Delivery</span>
                <a href="#">Enter your postal code for Delivery Availability</a>
              </div>
            </div>

            <div className="info-box">
              <img src="/image/icons/Icon-return.png" alt="" />
              <div className="info-text">
                <span className="info-title">Return Delivery</span>
                Free 30 Days Delivery Returns. <a href="#">Details</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
