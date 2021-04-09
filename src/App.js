import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";


import Form from "./Form";



function App() {
  return (
    <Router>
      <div className="container">
        <Form />
        
      </div>
    </Router>
  );
}

export default App;
