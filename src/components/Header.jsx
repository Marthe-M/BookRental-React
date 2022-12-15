import React from 'react'
import { useNavigate } from "react-router-dom"
import logo from '../assets/0012p000041aQ4LAAU.png'



function Header() {
  const navigate = useNavigate();
  
  function logOut() {
    localStorage.clear();
    navigate('/login');
    
  }

  if (localStorage.getItem("token") === null) {
    //...
  }

  return (
    <div className="header">
      <img src={logo} alt='Header' className='header-img' />
      {(localStorage.getItem("token") === null) ? null : <button type="submit" className="login-button logout" onClick={() => logOut()}>Logout</button>}
    </div>
   
  )
}

export default Header