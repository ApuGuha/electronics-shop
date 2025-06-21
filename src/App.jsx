import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Header } from './components/header/Header';
import { Sidemenu } from './components/header/Sidemenu';
import { Footer } from './components/Footer';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact'; 



function App() {

  return (
    <>
    <Router>
      <Header/>
      <Sidemenu/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Optional: 404 page */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
