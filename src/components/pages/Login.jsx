import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Save current page path for redirection after login
  useEffect(() => {
    const alreadySet = localStorage.getItem("redirectAfterLogin");
    if (!alreadySet && location.state?.from) {
      localStorage.setItem("redirectAfterLogin", location.state.from);
    } else if (!alreadySet && location.pathname !== "/login") {
      localStorage.setItem("redirectAfterLogin", location.pathname);
    }
  }, [location]);

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Reset errors
    setErr("");
    setEmailError("");
    setPasswordError("");

    let valid = true;

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
      login(email, password);

      const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectTo);
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <section className="section">
      <div className="auth_container">
        <div className="auth_img">
          <img
            src={`${import.meta.env.VITE_SITE_URL}/image/auth-image.png`}
            alt="auth"
            className="auth_image"
          />
        </div>
        <div className="auth_content">
          <form onSubmit={handleLogin} className="auth_form" noValidate>
            <h2 className="form_title">Login to your account</h2>
            <p className="auth_p">Enter your details below</p>

            {err && <p style={{ color: "red" }}>{err}</p>}

            <div className="form_group">
              <input
                type="email"
                className="form_input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <small style={{ color: "red" }}>{emailError}</small>
              )}
            </div>

            <div className="form_group form_pass">
              <input
                type="password"
                className="form_input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <small style={{ color: "red" }}>{passwordError}</small>
              )}
            </div>

            <div className="form_group">
              <button className="form_btn" type="submit">
                Login
              </button>
            </div>

            <div className="form_group">
              <span>
                Don't have an account?
                <Link to="/signup" className="form_auth_link">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
