import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './newsletter.css';
import { useAuth } from '../Login/auth';
// pdfjs worker from an external CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const routerPath = `/api`;//beginning of routerPath for login
const backendUrl = 'http://localhost:8080';//using cors to connect the backend to the front end

function NewsletterUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [latestNewsletterUrl, setLatestNewsletterUrl] = useState('');
  const [numPages, setNumPages] = useState(null);
  const backendUrl = 'http://localhost:8080'; // The backend URL

  const [accountType, setAccountType] = useState('');
  const { userEmail } = useAuth();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to fetch the latest newsletter
  const fetchLatestNewsletter = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/latestNewsletter`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setLatestNewsletterUrl(`${backendUrl}/newsletters/${data.pdf}`);
    } catch (error) {
      console.error('Error fetching latest newsletter:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);

    try {
      setUploadStatus('Uploading...');
      const response = await fetch(`${backendUrl}/api/uploadNewsletter`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      const responseData = await response.json();
      setUploadStatus(`Upload successful: uploaded on ${responseData.details.uploadDate}`);
      fetchLatestNewsletter(); // Fetch the latest newsletter after upload
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  useEffect(() => {
    fetchLatestNewsletter(); // Fetch the latest newsletter when the component mounts
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

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
    <div>
      {accountType === 'Admin' && <>
      <h2>Upload Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
      </>}
  
      {/* PDF display */}
      {latestNewsletterUrl && (
        <div>
          <h3>Latest Newsletter</h3>
          <Document
            file={latestNewsletterUrl}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
}

export default NewsletterUpload;
