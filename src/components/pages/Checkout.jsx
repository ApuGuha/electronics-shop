import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  console.log(cartItems);

  const [fname, setFName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [apartment, setApartment] = useState('');
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [cityError, setCityError] = useState('');
  const [addressError, setAddressError] = useState('');

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const validatePhone = (phone) => /^[0-9+\-\s]{7,15}$/.test(phone);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      localStorage.setItem('redirectAfterLogin', '/checkout');
      navigate('/signup');
    }
  }, []);

  const handleCheckout = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      swal("Error", "Your cart is empty", "error");
      return;
    }

    setNameError('');
    setEmailError('');
    setPhoneError('');
    setCityError('');
    setAddressError('');

    let valid = true;

    if (!fname.trim()) {
      setNameError("Name is required.");
      valid = false;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid phone number.");
      valid = false;
    }

    if (!city.trim()) {
      setCityError("City is required.");
      valid = false;
    }

    if (!address.trim()) {
      setAddressError("Address is required.");
      valid = false;
    }

    if (!valid) return;

    try {
      const order = {
        customer: {
          fname,
          email,
          phone,
          city,
          address,
          apartment,
          companyName,
        },
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        orderdate: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([...existing, order]));

      clearCart();

      setFName('');
      setEmail('');
      setPhone('');
      setCity('');
      setAddress('');
      setApartment('');
      setCompanyName('');

      swal("Success", "Order placed successfully!", "success").then(() => {
        navigate("/");
      });
    } catch (error) {
      swal("Error", "Form submission error", "error");
    }
  };

  return (
    <section className="checkout-section">
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <h2>Billing Details</h2>
          
            <form onSubmit={handleCheckout}>
              <div className="checkout-container container">
              <div className="billing-details">
                <label>
                  First Name<span>*</span>
                  <input
                    type="text"
                    name="fname"
                    value={fname}
                    onChange={(e) => setFName(e.target.value)}
                  />
                  {nameError && <small style={{ color: "red" }}>{nameError}</small>}
                </label>
                <label>
                  Company Name
                  <input
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </label>

                <label>
                  Street Address<span>*</span>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {addressError && <small style={{ color: "red" }}>{addressError}</small>}
                </label>
                <label>
                  Apartment, floor, etc. (optional)
                  <input
                    type="text"
                    name="apartment"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />
                </label>

                <label>
                  Town/City<span>*</span>
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {cityError && <small style={{ color: "red" }}>{cityError}</small>}
                </label>
                <label>
                  Phone Number<span>*</span>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {phoneError && <small style={{ color: "red" }}>{phoneError}</small>}
                </label>
                <label>
                  Email Address<span>*</span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <small style={{ color: "red" }}>{emailError}</small>}
                </label>
                <div className="save-info">
                  <input type="checkbox" id="save-info" />
                  <label htmlFor="save-info">
                    Save this information for faster check-out next time
                  </label>
                </div>
              </div>
              

              <div className="order-summary">
                {cartItems.map((item) => (
                  <div
                    className="order-item"
                    key={`${item.id}-${item.color}-${item.size}`}
                  >
                    <div className="item-det">
                      <img src={item.image[0]} alt="item"/>
                      <p>{item.name} <span>x {item.quantity}</span></p>
                    </div>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="total-line">
                  <p>Subtotal:</p>
                  <span>
                    ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                  </span>
                </div>
                <div className="total-line">
                  <p>Shipping:</p>
                  <span>Free</span>
                </div>
                <div className="total-line total">
                  <p>Total:</p>
                  <span>
                    ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                  </span>
                </div>

                <div className="payment">
                  <div className="for-cod">
                    <input type="radio" name="payment" id="cod" defaultChecked />
                    <label htmlFor="cod">Cash on delivery</label>
                  </div>
                </div>

                <div className="coupon">
                  <input type="text" placeholder="Coupon Code" />
                  <button type="button" className="btn">
                    Apply Coupon
                  </button>
                </div>

                <button className="btn place-order" type="submit">
                  Place Order
                </button>
              </div>
              </div>
              </form>
          
        </>
      )}
    </section>
  );
};
