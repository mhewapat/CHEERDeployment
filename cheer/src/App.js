
import './App.css';
import Navbar from './components/Home/Navbar.jsx';
import Login from './components/Login/login.jsx';
import CreateAccount from './components/CreateAccount/ca.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import Contact from './components/Contact/contact.jsx';
import MainPage from "./components/MainPage/MainPage.jsx";
import { AuthProvider } from './components/Login/auth.jsx';
import DownloadPDF from './components/FormBuilder/downloadPDF.js';
import UploadPDF from './components/FormBuilder/uploadPDF.js';
import PdfAccess from './components/FormBuilder/pdfAccess.js';
import UploadPDFAdmin from './components/FormBuilder/uploadPDFadmin.js';
import NewsletterUpload from './components/Newsletter/newsletter.jsx';
import About from './components/About/about.jsx'
import Calendar from './components/Calendar/schedule.jsx';
import ContextWrapper from './context/ContextWrapper.js';

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
    },
    {
      path: 'calendar',
      element: <> <Navbar/>
      <ContextWrapper>
          <Calendar/>
      </ContextWrapper>
      </>
    },
    {
      path: 'about',
      element: <> <Navbar />
      <About />
      </>
    },
    {
      path: 'downloadPDF',
      element: <> <Navbar/>
      <DownloadPDF/>
      </>

    },
    {
      path: 'uploadPDF',
      element: <> <Navbar/>
      <UploadPDF/>
      </>

    },
    {
      path: 'pdfAccess',
      element: <> <Navbar/>
      <PdfAccess/>
      </>

    },
    {
      path: 'pdfUploadAdmin',
      element: <> <Navbar/>
      <UploadPDFAdmin/>
      </>

    },
    {
      path: 'main',
      element: <>
        <Navbar/>
        <MainPage/>
      </>
    },

    {
      path: 'newsletter',
      element: <> <Navbar />
      <NewsletterUpload />
      </>
    }

  ]);
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
