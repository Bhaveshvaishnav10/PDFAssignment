import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">PDF</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Upload</Link>
          </li>
          <li className="navbar-item">
          <Link to="/view" className="nav-link">View PDF</Link>
          </li>
        </ul>
        </div>
      </nav>
    )
}

export default Navbar
