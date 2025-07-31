import { useState } from "react";

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9+\-\s]{7,15}$/;
    return regex.test(phone);
  };

  const handleRegisterContact = (e) => {
    e.preventDefault();

    // Clear previous errors and success
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setSuccessMessage('');

    let valid = true;

    if (!name.trim()) {
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

    if (!valid) return;

    try {
      // Normally you'd send the data to a server here

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSuccessMessage("Thanks for your response. We will contact you soon.");
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <section className="con-body">
      <div className="container">
        <div className="con-body-left">
          <div className="call-block cmn-block">
            <h5>
              <img src="image/icons/icons-phone.png" alt="" /> &nbsp; Call To Us
            </h5>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>
          <div className="hr"></div>
          <div className="mail-block cmn-block">
            <h5>
              <img src="image/icons/icons-mail.png" alt="" /> &nbsp; Write To US
            </h5>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>
              Emails:
              <a href="mailto:customer@exclusive.com">customer@exclusive.com</a>
            </p>
            <p>
              Emails:
              <a href="mailto:support@exclusive.com">support@exclusive.com</a>
            </p>
          </div>
        </div>
        <div className="con-body-right">
          <form onSubmit={handleRegisterContact}>
            <div className="form-row">
              <div>
              <input
                type="text"
                placeholder="Your Name *"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <small style={{ color: "red" , display: "block"}}>{nameError}</small>}
              </div>
              <div>
              <input
                type="email"
                placeholder="Your Email *"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <small style={{ color: "red" , display: "block"}}>{emailError}</small>}
              </div>
              <div>
              <input
                type="tel"
                placeholder="Your Phone *"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phoneError && <small style={{ color: "red" , display: "block"}}>{phoneError}</small>}
              </div>
            </div>
            <div>
            <textarea
              placeholder="Your Message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            </div>

            <div className="form-actions">
              <button type="submit">Send Message</button>
            </div>
          </form>

          {successMessage && (
            <div style={{ marginTop: '1rem', color: 'green' }}>
              <strong>{successMessage}</strong>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
