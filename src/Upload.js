import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";





export const Upload = () => {
  
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setloading] = useState(false);
  const [pdfFileError, setPdfFileError] = useState("");
  
  const [selectedfile, setselectedFile] = useState(null)

  
  const [name , setname] = useState();
 
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
  
  const fileType = ["application/pdf"];
  const handlePdfFileChange = async(e) => {
    await setselectedFile(e.target.files[0]);
    if (selectedfile) {
      if (selectedfile && fileType.includes(selectedfile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedfile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  // form submit
  const handlePdfFileSubmit = async(e) => {

     setloading(true);
    e.preventDefault();
    console.log("HELLO")
    var  token = readCookie("Login")
    
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
     
      
      var formdata = new FormData();
      formdata.append("name", name);
      formdata.append("file", selectedfile);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      
      fetch("https://ctapi.kilobytetech.com/api/folder/5e2c5b5d5323c70ae924a815/addPdf", requestOptions)
        .then(response => response.text())
        .then(result => { console.log(result)
           
          alert("Uploaded Successfully")
           setloading(false)
          
        } 
          )
        .catch(error => console.log('error', error));
    
  };

  return (
    <div className="container">
      
       <h1>Upload Pdf File</h1>
       <br></br>
      <form className="form-group" onSubmit={handlePdfFileSubmit}>
        <label>Enter File Name:</label>
        <input
          type = "text"
          placeholder= "File  Name"
           value={name}
           onChange = {(e ) => setname(e.target.value)} 
           style = {{width:"20%" , margin:10, }}
           />
         
        <input
          type="file"
          className="form-control"
          required
          onChange={handlePdfFileChange}
          style={{justifyContent:"center", alignSelf:'center'}}
        />
        {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
        <br></br>
        {loading ? (
          <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          
        />
        ) : (
          <button type="submit" className="btn btn-success btn-lg" >
          UPLOAD
        </button>
       )}
        
      
        
      </form>
      
      
    </div>
  );
};

export default Upload;
