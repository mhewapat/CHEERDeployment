import React, { useState } from 'react';
import "./upload.css"; 
import axios from "axios";
//import { response } from 'express';

function UploadPDF(){
    const [title, setTitle] = useState()
    const [file, setFile] = useState()

    
    const submitImage = async(e)=>{
      e.preventDefault()
      const formData = new FormData()
      formData.append("title" ,title);
      formData.append("file", file);
 
      try{
        const result =await axios.post("http://localhost:8080/api/upload", formData, {
          headers: {"Content-Type": "multipart/form-data"}
        })
      
      }catch(e){
        console.log(e)
      }
   
      
    }
  



    return (
             <div className='login-container'>
            <h3 className='login-header'>Upload forms you want clients to fill</h3>
          <form className='formStyle middle' onSubmit={submitImage}> 
            <input
              type="text"
              className='email-input' 
              placeholder='Title' 
              required
              onChange={(e)=>setTitle(e.target.value)}
              />
            <input 
              type='file'
              name='file' 
              className='email-input'
              onChange={(e)=> setFile(e.target.files[0])}//accepts the first file
              />
            <button className='btnStyle' type='submit'>Upload</button>

          </form>
            
        </div>
    )
}
export default UploadPDF