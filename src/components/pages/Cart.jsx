import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, loading } = useCart();
  const navigate = useNavigate();

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
        <div className="cart">
          {cartItems.length === 0 ? (
            <div>
              <p>Your cart is empty</p>
              <button onClick={() => navigate("/shop")} className="container_btn_a">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart_header">
                <p className="cart_header_title">Product Title</p>
                <p className="cart_header_image">Product Image</p>
                <p className="cart_header_quantity">Product Quantity</p>
                <p className="cart_header_price">Price</p>
                <p className="cart_header_delete">Delete</p>
              </div>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div
                    className="cart_item"
                    key={`${item.id}-${item.color}-${item.size}`}
                  >
                    <p className="cart_item_title">{item.name}</p>
                    <div className="cart_item_image">
                      <img
                        src={`${import.meta.env.VITE_SITE_URL}${item.image}`}
                        alt={item.name}
                      />
                    </div>
                    <div className="cart_item_quantity">
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
                    <p className="cart_item_price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.color, item.size)
                      }
                      className="cart_item_delete"
                      aria-label="Remove item from cart"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              <h3>Total: ${getTotal().toFixed(2)}</h3>
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