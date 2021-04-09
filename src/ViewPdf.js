import { message } from "antd";
import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';

const ViewPdf = () => {
  const [error, setError] = useState(null);

  const [id, setid] = useState();

  const [items, setItems] = useState([]);

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  useEffect(() => {
    var token = readCookie("Login");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch("https://ctapi.kilobytetech.com/api/user/files", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result.data)
          console.log(result.data);
        },

        (error) => {
          setError(error);
        }
      );
  }, []);

  const View = () => {
     
   
    

    
    var token = readCookie("Login");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
   
    fetch("https://ctapi.kilobytetech.com/api/session?file=", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
           setid(result)
         
        },

        (error) => {
          setError(error);
        }
      );
  }

  return  (
   <div>
     <h1>Pdf Uploaded</h1>
    {items.map((singleFile) => {
      return (
        <div style={{margin:20 ,  width:"80%"  , borderWidth:1}}>
          <a style={{fontSize:16, }}> File Name :  {singleFile.name}</a>
         <br/>
          
          <Link to={ `/content/${singleFile._id}`} >{singleFile.link}</Link>
          <br/>
          
        </div>


        
        
      );
    })}
    </div>
  )
        


};

export default ViewPdf;
