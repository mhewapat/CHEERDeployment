
import './App.css';
import Navbar from './components/Home/Navbar.jsx'
import Login from './components/Login/login.jsx'
import CreateAccount from './components/CreateAccount/ca.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/home.jsx'
import Contact from './components/Contact/contact.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <> <Navbar />
      <Home />
      </>
     
    },
    {
      path: 'contact',
      element: <> <Navbar />
      <Contact />
      </>
    },
    {
      path: 'login',
      element: <> <Navbar />
      <Login />
      </>
    },
    {
      path: 'signup',
      element: <> <Navbar />
      <CreateAccount />
      </>
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
