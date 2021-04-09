import React, { useState, useEffect } from "react";
import "./Form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Upload from "./Upload";

import Navbar from "./Navbar"
import ViewPdf from "./ViewPdf";
import  Content  from "./Content";


const Form = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loggedIn, setloggedIn] = useState(false);

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

  useEffect(() => {
    var  token = readCookie("Login")
    if(token){
        setloggedIn(true)
    }
  }, []);
  

  const submit = async (e) => {
    console.log("Hello");
    e.preventDefault();
    var body = JSON.stringify({
      email,
      password,
     
    });

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      redirect: "follow",
    };

    await fetch("https://ctapi.kilobytetech.com/api/user/login", requestOptions)
      .then((response) =>  response.json())
      .then((result) => {
         console.log("result" , result.data.token)
         
        if(result.message=="Login Successfull") {  
          
          alert("Login Successfull")  
          setloggedIn(true)
          document.cookie = `Login=${result.data.token}`;
          
         
        }else{
           alert("Login Failed. Check Email and Password")
        } 
      })
      .catch((error) => {
        console.log("error", error);
        alert("error");
      });
      
  };

  return (
    <>
    {!loggedIn ? (
      <div className="form-container">
      <div className="form-content-right">
        <form className="form" onSubmit={submit}>
          <h1 style={{alignSelf:'center'}}>Login Here.</h1>
          <div className="form-inputs">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="text"
              name="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className="form-inputs">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Enter Password "
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          
          
          <button className="form-input-btn">Login</button>
        </form>
      </div>
    </div>
    ) : (
      
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Upload} />
        <Route path="/view" component={ViewPdf} />
        <Route path="/content/:id" component={Content} />
      </div>
    </Router>

    

     
    
    )}
      
    </>
  );
};

export default Form;
