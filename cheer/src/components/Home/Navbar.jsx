import React, { useState, useEffect } from 'react';
import './Navbar.css';
import './home.css';
import logo from "./logo.png";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Login/auth';
const routerPath = `/api`;//beginning of routerPath for login
const backendUrl = 'http://localhost:8080';//using cors to connect the backend to the front end

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //check if user is logged in
  const [accountType, setAccountType] = useState('');
  const location = useLocation();
  const { logout } = useAuth();
  const { userEmail } = useAuth();

  useEffect(() => {
    // runs when path is changed
    if(location.pathname === '/') {
      setIsLoggedIn(false);
    }
    else if(location.pathname === '/main'  || accountType !== ''){
      setIsLoggedIn(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    getUserType();
  }, []);

  const getUserType = () => {
    fetch(`${backendUrl}${routerPath}/login?email=${userEmail}`,{
      headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
      }
  })
      .then(res => res.json()
      .then(data => {
            setAccountType(data.data);
      })
      .catch((error) => {
          console.log(error + " error from login data retrieval");//error msg if there is an error when retrieving the data
          })
      )
      .catch((err)=>{//error msg if there is an error reading the json from the backend
          console.log(err)
      })
  }


  return (
    <>
      {isLoggedIn && <div className="logo-container">
        <Link to="/main" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="Ongoing Living & Learning Inc. Logo" style={{ width: '120px', height: 'auto' }} />
          <h1 className="logo-title" style={{ color: '#F5F5E1' }}>O.L.L.I</h1>
        </Link>
      </div>}
       {!isLoggedIn && <div className="logo-container">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="Ongoing Living & Learning Inc. Logo" style={{ width: '120px', height: 'auto' }} />
          <h1 className="logo-title" style={{ color: '#F5F5E1' }}>O.L.L.I</h1>
        </Link>
      </div>}
      <nav className="navbar">
        <ul className="nav-list">
          {!isLoggedIn && 
          <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
          }
          {isLoggedIn && 
          <li className="nav-item" onClick={() => {setIsLoggedIn(false); logout();}}><Link to="/" className="nav-link">Logout</Link></li>
          }
          <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
          <li className="nav-item"><Link to="/newsletter" className="nav-link">Newsletter</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-link">About Us</Link></li>
          <li className="nav-item"><Link to="/calendar" className="nav-link">Calendar</Link></li>
          {accountType === 'Client' && 
          <>
            <li className="nav-item"><Link to="/downloadPDF" className="nav-link">Download files</Link></li>
            <li className="nav-item"><Link to="/UPloadPDF" className="nav-link">Upload files</Link></li>
          </>}
          {accountType === 'Admin' && 
          <>
            <li className="nav-item"><Link to="/pdfAccess" className="nav-link">View Files</Link></li>
            <li className="nav-item"><Link to="/pdfUploadAdmin" className="nav-link">Admin pdf upload</Link></li>
          </>
          }
        </ul>
      </nav>
    </>
  );
}

export default Navbar;