import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch product by ID
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id === parseInt(id));
        setProduct(found);
      });
  }, [id]);

  // Add to cart with validations
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

  if (!product) return <div>Loading product...</div>;

  return (
    <div className="product-page">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '300px', marginBottom: '1rem' }}
      />

      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <strong>₹{product.price}</strong>
        <p>Category: {product.category}</p>
        <p>Rating: ⭐ {product.rating}</p>

        {/* Color Selection */}
        {product.color?.length > 0 && (
          <div>
            <label><strong>Colors:</strong></label><br />
            {product.color.map((clr, i) => (
              <label key={i} style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name="color"
                  value={clr}
                  checked={selectedColor === clr}
                  onChange={(e) => setSelectedColor(e.target.value)}
                />{' '}
                {clr}
              </label>
            ))}
          </div>
        )}

        {/* Size Selection */}
        {product.size?.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <label><strong>Sizes:</strong></label><br />
            {product.size.map((sz, i) => (
              <label key={i} style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name="size"
                  value={sz}
                  checked={selectedSize === sz}
                  onChange={(e) => setSelectedSize(e.target.value)}
                />{' '}
                {sz}
              </label>
            ))}
          </div>
        )}

        {/* Quantity Input */}
        <div style={{ marginTop: '10px' }}>
          <label><strong>Quantity:</strong></label><br />
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value > 0) {
                setQuantity(value);
                } else {
                setQuantity(1); // fallback
                }
            }}
            />
        </div>

        {/* Add to Cart Button */}
        <button
          className="add_to_cart"
          style={{ marginTop: '20px' }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
