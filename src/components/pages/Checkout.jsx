import { useForm } from "react-hook-form";
import { useCart} from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors}} = useForm();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if(!user)
    {
      navigate('/signup');
    }

  }, []);

  const onSubmit = (data) => {
    if(cartItems.length === 0)
    {
      alert("Your cart is empty");
      return;
    }

    const order = {
      customer : data,
      items: cartItems,
      total: cartItems.reduce((sum,item)=> sum + item.price* item.quantity, 0),
      orderdate : new Date().toISOString()
    }

    console.log("Order Placed:", order);

    // Save order to localStorage (optional)
    const existing = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existing, order]));

    clearCart();
    reset();

  }

  return (
    
    <div className="checkout-container">
      {
      cartItems.length === 0 ? (
      <p>Cart is empty</p>
      ) : (
      <>
      <h2>Checkout</h2>
      <div className="cart-summary">
        {cartItems.map((item)=>(
          <div key={`${item.id}-${item.color}-${item.size}`}>
            <strong>{item.name}:</strong>size - {item.size},color - {item.color} quantity - {item.quantity} = ${item.price * item.quantity}
          </div>
        ))}
        <p><strong>Total:</strong>${cartItems.reduce((sum,item)=> sum + item.price * item.quantity, 0)}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
        <div>
          <label>Full Name</label>
          <input {...register("fullname", {required: "Name is required"})}/>
          {errors.fullname && <p>{errors.fullname.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input {...register("email", {required: "Email is required"})} type="email"/>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Address</label>
          <textarea {...register("address", {required: "Address is required"})}></textarea>
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <div>
          <label>Phone number</label>
          <input {...register("phone", {required: "Phone is required", pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number"
              }})} type="tel"/>
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <button type="submit">Place Order</button>
      </form>
      </>
      )}
    </div>
            
  )
}
