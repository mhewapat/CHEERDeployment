import React from 'react';
import './MainPage.css';
import background from "../Home/cheergroup.png"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../Login/auth';
import Clock from '../Clock/clock.jsx';
const routerPath = `/api`;//beginning of routerPath for login
const backendUrl = 'http://localhost:8080';//using cors to connect the backend to the front end

const Home = () => {
  const [accountType, setAccountType] = useState('');
  const [userName, setUserName] = useState('');
  const [clientList,  setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const { userEmail } = useAuth();
  const [clientData, setClientData] = useState([]);
  const [visibility, setVisibility] = useState(false);

  // use effects
  useEffect(() => {
    getUserType();
  }, []);

  useEffect(() => {
    const options = async () => {
      try {
        const response = await fetch(`${backendUrl}${routerPath}/clientList`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setClientList(data.fullName);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    options();
  }, []);

  // functions
  const getUserType = () => {
    fetch(`${backendUrl}${routerPath}/login?email=${userEmail}`,{
      headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
      }
  })
      .then(res => res.json()
      .then(data => {
            setAccountType(data.data);
            setUserName(data.username);
      })
      .catch((error) => {
          console.log(error + " error from login data retrieval");//error msg if there is an error when retrieving the data
          })
      )
      .catch((err)=>{//error msg if there is an error reading the json from the backend
          console.log(err)
      })
  }

  const selectClient = (event) => {
    setSelectedClient(event.target.value);
  };

  const getClientInfo = () => {
    let client = selectedClient.split(" ");
    console.log('client:', client);
    fetch(`${backendUrl}${routerPath}/clientInfo?firstName=${client[0]}&lastName=${client[1]}`,{
      headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
      }
  })
      .then(res => res.json()
      .then(data => {
        setClientData(data);
        setVisibility(true);
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
    <div>
      {accountType === '' && <h1>Error: Not Logged In</h1>}
      <main>
      {accountType !== '' && (
        <>
        <h1>Welcome, {userName}!</h1>
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
              </div>
            </div>
          </div>
        </>
      )}

      
        {accountType === 'Admin' && 
            <div>
              <div className="main-container">
                <div className='content-container'>
                  <h2 className='subtitle'>Calendar</h2>
                </div>
              </div>
              <div className="main-container">
                <div className='content-container'>
                  <h2 className='subtitle'>Manage Newsletter</h2>
                </div>
              </div>
              <div className="main-container">
                <div className='content-container'>
                  <h2 className='subtitle'>Access Client Info</h2>
                  <label for="client-select">Choose A Client:</label>
                  <select name='client-select' value={selectedClient} onChange={selectClient}>
                    <option hidden></option>
                  {clientList.map((client, index) => (
                    <option key={index} value={client.name}>
                      {client.name}
                    </option>
                  ))}
                  </select>
                  <button onClick={getClientInfo}>Get Details</button>

                  {visibility && <div>
                    <p>{'Medical Conditon(s):'} {clientData.medicalCondition.length > 0 ? clientData.medicalCondition : 'none'}</p>
                    <p>{'Allergy(s):'} {clientData.allergies.length > 0 ? clientData.allergies : 'none'}</p>
                    <p>{'Extra Information:'} {clientData.extraInfo.length > 0 ? clientData.extraInfo : 'none'}</p>
                  </div>}

                </div>
              </div>
            </div>
            
            }
        {accountType === 'Client' && 
              <div className="main-container">
                <div className='content-container'>
                  <h2 className='subtitle'>Calendar</h2>
                </div>
              </div>}
        {accountType === 'Parent' && 
              <div className="main-container">
                <div className='content-container'>
                  <h2 className='subtitle'>Calendar</h2>
                </div>
              </div>}
        {accountType === 'Staff' && 
            <div>
              <div className="main-container">
                <div className='content-container'>
                  <h2 className='subtitle'>Calendar</h2>
                </div>
              </div>
              <div className="main-container">
                <div className='content-container'>
                  <h2 className='subtitle'>Clock-In/Clock-Out</h2>
                  <Clock />
                </div>
              </div>
            </div>}
      </main>

      <footer>
        <p>&copy; 2024 Ongoing Living & Learning Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;