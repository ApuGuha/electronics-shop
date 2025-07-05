import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
const Signup = () => {
    const {register} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName]= useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        try{
            register(name,email,password);
            navigate('/login');
        }
        catch(error)
        {
            setErr(error.message);
        }
    }
  return (
    <section className="section">
      <div className="auth_container">
        <div className="auth_img">
          <img src={`${import.meta.env.VITE_SITE_URL}/image/auth-image.png`} alt="" className="auth_image" />
        </div>
        <div className="auth_content">
          <form onSubmit={handleRegister} className="auth_form">
            <h2 className="form_title">Create your account</h2>
            <p className="auth_p">Enter your details below</p>
            {err && <p style={{ color: "red" }}>{err}</p>}
            <div className="form_group">
              <input type="text" className="form_input" name="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name"/>
            </div>
            <div className="form_group">
              <input type="email" className="form_input" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email"/>
            </div>
            <div className="form_group form_pass">
              <input
                type="password"
                className="form_input" 
                name="password"
                value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password"
                />
            </div>
            <div className="form_group">
              <button className="form_btn" type="submit">
                Create Account
              </button>
            </div>
            <div className="form_group">
              <span
                >Already have an account?
                    <Link to="/login" className="form_auth_link">
                    Login
                    </Link>
                </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Signup;