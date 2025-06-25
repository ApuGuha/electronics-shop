import { useCart } from "../contexts/CartContext"

export const Cart = () => {
    const { cartItems, addToCart, removeFromCart, updatequantity, clearCart } = useCart();

    const getTotal = () =>
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <section className="section">
        <div className="container">
            <div className="cart">
                {
                    cartItems.length === 0 ? (
                    <p>Cart is empty</p>
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
                    {
                        cartItems.map((item)=>(
                                <div className="cart_item" key={item.id}>
                                    <p className="cart_item_title">{item.name}</p>
                                    <div className="cart_item_image">
                                        <img src={`${import.meta.env.VITE_SITE_URL}${item.image}`}/>
                                    </div>
                                    <div className="cart_item_quantity">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange= {(e) => updatequantity(item.id, parseInt(e.target.value))}
                                        />
                                    </div>
                                    <p className="cart_item_price">${(item.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={()=> removeFromCart(item.id)} className="cart_item_delete">🗑️</button>
                                </div>
                            
                        ))
                    }
                    </div>
                <h3>Total: ${getTotal().toFixed(2)}</h3>
                <button onClick={clearCart}>Clear Cart</button>
                </>
            )
        }
            </div>
        </div>
    </section>
  )
}
