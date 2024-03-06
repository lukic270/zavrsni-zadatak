import React, { useEffect } from 'react';
import { useAuth } from '../components/useAuth'; // Pretpostavka da postoji kontekst za autentifikaciju

export default function Navbar() {
  const { token,logOut, } = useAuth(); // Pretpostavka da postoji funkcija za proveru autentifikacije



  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/galleries">All Gallery</a>

        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {token && (
              <>
               
                <li className="nav-item">
                  <a className="nav-link" href="/create">Create New Gallery</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href='/login' onClick={logOut}>Logout</a>
                               </li>
                <li className="nav-item">
                  <a className="nav-link" href="/my-galleries">My gallery</a>
                </li>
              </>
            )}
            {!token && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
