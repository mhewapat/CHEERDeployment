import React from 'react';
import './Navbar.css';
import './home.css';
import logo from "./logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
       <div className="logo-container">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="Ongoing Living & Learning Inc. Logo" style={{ width: '120px', height: 'auto' }} />
          <h1 className="logo-title" style={{ color: '#F5F5E1' }}>O.L.L.I</h1>
        </Link>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
          <li className="nav-item"><a href="#" className="nav-link">Newsletter</a></li>
          <li className="nav-item"><a href="#" className="nav-link">About Us</a></li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;