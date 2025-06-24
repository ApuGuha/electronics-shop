import { useCart } from "../contexts/CartContext"

export const Cart = () => {
    const { cartItems, addToCart, removeFromCart, updatequantity, clearCart } = useCart();

    const getTotal = () =>
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="cart-page">
        <h2>Cart Page</h2>
        {
            cartItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <>
                <ul>
                    {
                        cartItems.map((item)=>(
                            <li key={item.id}>
                                <h4>{item.name}</h4>
                                <p>${item.price.toFixed(2)}</p>
                                <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange= {(e) => updatequantity(item.id, parseInt(e.target.value))}
                                />
                                <button onClick={()=> removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))
                    }
                </ul>
                <h3>Total: ${getTotal().toFixed(2)}</h3>
                <button onClick={clearCart}>Clear Cart</button>
                </>
            )
        }
        
    </div>
  )
}
