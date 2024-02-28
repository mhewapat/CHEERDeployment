import React, { useEffect, useState } from 'react';
import "./downloadPDF.css"; 
import axios from "axios";
import { pdfjs } from 'react-pdf'

function DownloadPDF(){
    const [doc, setDoc] = useState(null)
   //const [pdfFile, setPdfFile] = useState(null)

    const getPdf = async ()=>{
        const result = await axios.get("http://localhost:8080/api/getForms")
        console.log(result.data.data);
        setDoc(result.data.data);
    }
  

    useEffect(()=>{

        getPdf()
    }, []);
    
 
    const showPdf = (pdf)=>{
      window.open(`http://localhost:8080/adminPdfs/${pdf}`, "_blank", "noreferrer")
  
    }


    return (
        <div className='login-container'>
            <h3 className='login-header'>Forms to fill:</h3>
            {doc==null?"" : doc.map((data,index)=>{
                return (
                    <div key={index}>
                        <h6 className='title'>Title: {data.title}</h6>
                        <button className="btnStyle" onClick={() => showPdf(data.pdf)}>View form</button>
                        </div>
                )
            })}
       
 
         
     
        </div>
    )
}
export default DownloadPDF