import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ProductPageSecond = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id === parseInt(id));
        setProduct(found);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select a color and size');
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity: Number(quantity)
    };

    addToCart(cartItem);
  };

  const handleQtyChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  if (!product) return <div>Loading product...</div>;

  return (
    <section className="pdp-container-box">
      <div className="container">
        <div className="product-image">
          <div className="controller-max">
            <div className="swiper swiper--product-thumbs">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {product?.img?.map((prod, i) => (
                  <SwiperSlide key={i}>
                    <div className="swiper-slide">
                      <div className="ratio ratio-4x3">
                        <img src={prod.image} alt={prod.name} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
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
                <div key={i}>
                  <input
                    type="radio"
                    name="color"
                    value={clr}
                    checked={selectedColor === clr}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  />
                  <label></label> {clr}
                </div>
              ))}
            </div>
          )}

          {/* Size Selection */}
          {product.size?.length > 0 && (
            <div className="size-options">
              <h5>Size:</h5>
              <br />
              <div className="size-inputs">
                {product.size.map((sz, i) => (
                  <span key={i}>
                    <input
                      type="radio"
                      name="size"
                      value={sz}
                      checked={selectedSize === sz}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    />
                    <label htmlFor={sz}>{sz}</label>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Buy Now */}
          <div className="product-action-area">
            <div className="quantity-wrapper">
              <button onClick={() => handleQtyChange(-1)}>−</button>
              <input
                type="number"
                id="qty"
                value={quantity}
                min="1"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setQuantity(isNaN(value) || value < 1 ? 1 : value);
                }}
              />
              <button onClick={() => handleQtyChange(1)}>+</button>
            </div>
            <button className="buy-now" onClick={handleAddToCart}>
              Buy Now
            </button>
          </div>

          {/* Info Boxes */}
          <div className="info-box">
            <img src="image/icons/icon-delivery.png" alt="" />
            <div className="info-text">
              <span className="info-title">Free Delivery</span>
              <a href="#">Enter your postal code for Delivery Availability</a>
            </div>
          </div>

          <div className="info-box">
            <img src="image/icons/Icon-return.png" alt="" />
            <div className="info-text">
              <span className="info-title">Return Delivery</span>
              Free 30 Days Delivery Returns. <a href="#">Details</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
