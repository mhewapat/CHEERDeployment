import React from 'react';
import './home.css';
import Navbar from "./Navbar.jsx";
import logo from "./logo.png";
import background from "./cheergroup.png"
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        

      <main>
        <div className="main-container">
          <div className="background-container">
            <div className="background-image-container">
              <img src={background} alt="Background"/>
            </div>
            <div className="content-container">
              <h2 className="subtitle">
                C.H.E.E.R Group
              </h2>
              <p className="main-paragraph">
                Social, recreation, leisure, and friendship program for young adults with intellectual disabilities.
              </p>
              <br />
              <br />
              <div className="login-overlay">
              <Link to="/login" className="nav-link">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Ongoing Living & Learning Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;