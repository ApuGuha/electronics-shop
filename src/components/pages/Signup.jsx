import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Clear all errors first
    setErr('');
    setNameError('');
    setEmailError('');
    setPasswordError('');

    let valid = true;

    if (!name.trim()) {
      setNameError("Name is required.");
      valid = false;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    }

    if (!valid) return;

    try {
      register(name, email, password);
      navigate('/login');
    } catch (error) {
      setErr(error.message || "Registration failed.");
    }
  };

  return (
    <section className="section">
      <div className="auth_container">
        <div className="auth_img">
          <img
            src={`${import.meta.env.VITE_SITE_URL}/image/auth-image.png`}
            alt=""
            className="auth_image"
          />
        </div>
        <div className="auth_content">
          <form onSubmit={handleRegister} className="auth_form" noValidate>
            <h2 className="form_title">Create your account</h2>
            <p className="auth_p">Enter your details below</p>

            {err && <p style={{ color: "red" }}>{err}</p>}

            <div className="form_group">
              <input
                type="text"
                className="form_input"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              {nameError && <small style={{ color: "red" }}>{nameError}</small>}
            </div>

            <div className="form_group">
              <input
                type="email"
                className="form_input"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              {emailError && <small style={{ color: "red" }}>{emailError}</small>}
            </div>

            <div className="form_group form_pass">
              <input
                type="password"
                className="form_input"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {passwordError && <small style={{ color: "red" }}>{passwordError}</small>}
            </div>

            <div className="form_group">
              <button className="form_btn" type="submit">
                Create Account
              </button>
            </div>

            <div className="form_group">
              <span>
                Already have an account?
                <Link to="/login" className="form_auth_link">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
