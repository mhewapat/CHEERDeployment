import React, { useState, useEffect } from 'react';
import "./upload.css"; 
import axios from "axios";
import { get } from 'mongoose';
//import { response } from 'express';

function UploadPDFAdmin(){
    const [title, setTitle] = useState()
    const [file, setFile] = useState()
    const [msg , setMsg] = useState("")
    const [doc, setDoc] = useState(null)


    
    const submitImage = async(e)=>{
      e.preventDefault()
      const formData = new FormData()
      formData.append("title" ,title);
      formData.append("file", file);
      console.log(title, file)
      try{
        const result =await axios.post("http://localhost:8080/api/adminupload", formData, {
          headers: {"Content-Type": "multipart/form-data"}
        })
   
      setMsg(result.data['status'])
      
      }catch(e){
        setMsg(e)
      }


  
    }
   
  
     
   
       useEffect(()=>{
        const getPdf = async ()=>{
            const result = await axios.get("http://localhost:8080/api/getForms")
            console.log(result.data.data);
            setDoc(result.data.data);
        }
        getPdf()
     }, []);
       
    
       const showPdf = (pdf)=>{
         window.open(`http://localhost:8080/adminPdfs/${pdf}`, "_blank", "noreferrer")
     
       }


       const deletePdf = async(title)=>{
        var titleObj = {
            "title" : title
        }
       

        fetch(`http://localhost:8080/api/adminDeleteFile`,{//sending the email and password entered by the user to the backend for authentication
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(titleObj), // Convert the object to a JSON string
        })
        .then(res => res.json()
            )
            .catch((err)=>{//error msg if there is an error reading the json from the backend
                
            })
    
    
      }
   
      
     


    return (
        <div className='login-container'>
            <h3 className='login-header'>Upload forms you want clients to fill</h3>
          <form  onSubmit={submitImage}> 
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
            <h3>{msg}</h3>
          </form>
   
          <div className='login-containe'>
            <h4>Forms you uploaded previously:</h4>
            {doc==null?"" : doc.map((data,index)=>{
                return (
                    <div key={index}>
                        <h6>Title: {data.title}</h6>
                        <button className="btnStyle" onClick={() => showPdf(data.pdf)}>View form</button>
                        <button className="btnStyleD" onClick={() => deletePdf(data.pdf)}>delete</button>
                        </div>
                )
            })}
       
 
         
     
       
          </div>
            
        </div>
    )
}
export default UploadPDFAdmin