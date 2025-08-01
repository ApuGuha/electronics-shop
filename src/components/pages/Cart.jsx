import { useCart } from "../contexts/CartContext";
import { useNavigate,  useLocation } from "react-router-dom";

export const Cart = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, loading } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/signup");
    }
  };

  const handleLoginRedirect = () => {
  localStorage.setItem("redirectAfterLogin", location.pathname);
  navigate("/login");
};

  // Show loading state while cart is being loaded
  // if (loading) {
  //   return (
  //     <section className="section">
  //       <div className="container">
  //         <p>Loading cart...</p>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className="section">
      <div className="container">
         <div className="section_category">
          <p className="section_category_p">Cart</p>
        </div>
        <div className="cart">
          {cartItems.length === 0 ? (
            <div>
              <p className="cart_empty">Your cart is empty</p>
              <button onClick={() => navigate("/shop")} className="container_btn_a">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart_header">
                <p className="cart_header_title t-header">Product Title</p>
                <p className="cart_header_image t-header">Product Image</p>
                <p className="cart_header_quantity t-header">Product Quantity</p>
                <p className="cart_header_price t-header">Price</p>
                <p className="cart_header_delete t-header">Delete</p>
              </div>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div
                    className="cart_item t-body"
                    key={`${item.id}-${item.color}-${item.size}`}
                  >
                    <div className="cart_item_title cmn-cart-item"><h4>{item.name}</h4></div>
                    <div className="cart_item_image cmn-cart-item">
                      <img
                        src={`${import.meta.env.VITE_SITE_URL}${item.image[0]}`}
                        alt={item.name}
                      />
                    </div>
                    <div className="cart_item_quantity cmn-cart-item">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value > 0) {
                            updateQuantity(item.id, item.color, item.size, value);
                          }
                        }}
                      />
                    </div>
                    <div className="cart_item_price cmn-cart-item">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="cart_item_delete cmn-cart-item">
                        <button
                      onClick={() =>
                        removeFromCart(item.id, item.color, item.size)
                      }
                      
                      aria-label="Remove item from cart"
                    >
                      🗑️
                    </button>
                    </div>
                    
                  </div>
                ))}
              </div>
              <h3 className="total-price-cart">Total: ${getTotal().toFixed(2)}</h3>
              <div className="container_btn">
                <button onClick={clearCart} className="container_btn_a">
                  Clear Cart
                </button>
                <button onClick={handleCheckout} className="container_btn_a">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};