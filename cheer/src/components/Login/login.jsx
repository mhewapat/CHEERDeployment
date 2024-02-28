import './login.css';
import { Link, Navigate, useNavigate} from 'react-router-dom';
import {useState, useRef } from 'react';
import { Password } from '../Password/Password';
import background from './cheergroup.png';
import { useAuth } from './auth.jsx';

function Login (){
    const [email, setEmail] = useState(''); //update username
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState(''); //update state password if need
    const isMounted = useRef(true);
    const [loggedIn, setLoggedIn] = useState(''); //currently not logged in
    const [clientChosen,setChosenClient] = useState(false);//toggling picture password
    const [otherChosen,setOtherChosen] = useState(false);
    const [msg, setMsg] = useState('');
    const [clientPassword, setClientPassword] = useState([]); // updates the client password
    const routerPath = `/api`;//beginning of routerPath for login
    const backendUrl = 'http://localhost:8080';//using cors to connect the backend to the front end
    const navigate = useNavigate();
    const { login } = useAuth(); // used to store email from login

   
    const authenticate = () => {//calling authenticate to validate user
        if(clientChosen){
            checkCredentials(email, clientPassword.join()); // checks client password
        }
        else{
            checkCredentials(email, password); //passing in the changing input values of email and password
        }
    }
    const checkCredentials = (enteredEmail,enteredPassword) => {

        var requestBody = {
            "email":`${enteredEmail}`,
            "password":`${enteredPassword}`
        }
        fetch(`${backendUrl}${routerPath}/login`,{//sending the email and password entered by the user to the backend for authentication
            method: 'POST', //
            headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(requestBody), // Convert the object to a JSON string
        })
            .then(res => res.json()
            .then(data => {
                for(let dataV in data){
                    if(dataV === "data"){//if it is the token
                        localStorage.setItem("token",data[dataV]);//place the token value inside local storage
                    }
                    if(dataV === "message"){//displaying the message returned by the backend to notify the user
                         if(data[dataV] === "logged in successfully"){
                            login(enteredEmail); 
                            navigate('/main');
                         }
                        setMsg(data[dataV]);//setting that msg to be displayed
                    }
                }
                // change route to main page
            })
            .catch((error) => {
                console.log(error + " error from login data retrieval");//error msg if there is an error when retrieving the data
                })
            )
            .catch((err)=>{//error msg if there is an error reading the json from the backend
                console.log(err)
            })
    
    }

    // manage client password changes
    const handlePasswordChange = (newPassword) => {
        if (newPassword !== clientPassword) {
            setClientPassword(newPassword);
        }
    }
    

    return (
        <div id="login">
            <div className="page-container">
            <div className="background-image-container">
              <img src={background} alt="Background"/>
            </div>
                <div className="login-container container">
                    <div className="login-header header">
                        <h1>LOGIN:</h1>
                        <div className='account-select-container-login'>
                            <button className='btn-client-account' onClick={()=>{setChosenClient(true);setOtherChosen(false)}}>Client Account</button>
                            <button className='btn-other-account' onClick={()=>{setChosenClient(false);setOtherChosen(true)}}>Other Account</button>
                        </div>
                    </div>
                    <div className="login-input-container input-container">
                        <div className="email-input">
                            <p className="input-identifier">Email:</p>
                            <input className="input" type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email'></input>
                        </div>
                        {otherChosen && (
                            <div className="password-input">
                                <p className="input-identifier">Password:</p>
                                <input className="input" type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='password'></input>
                            </div>
                            )
                        }
                        {clientChosen && (
                            <div>
                                <Password onPasswordChange={handlePasswordChange}/>
                            </div>
                        )}
                    </div>
                    <button className='btn' onClick={authenticate}>Sign in</button>
                    <div className='msg-container'>
                            {msg}
                    </div>
                    <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
