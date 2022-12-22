import React, { useState } from 'react';
import Inventaris from './Inventaris'
import Users from './Users'
import Reservations from './Reservations'
import Loans from './Loans'
import { useNavigate } from "react-router-dom"

function Adminpage() {
  const [showReservations, setShowReservations] = useState(true);
  const [showInventory, setShowInventory] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  function toggleReservations() {
    setShowReservations(true)
    setShowInventory(false)
    setShowUsers(false)
  }

  function toggleInventory() {
    setShowReservations(false)
    setShowInventory(true)
    setShowUsers(false)
  }

  function toggleUsers() {
    setShowReservations(false)
    setShowInventory(false)
    setShowUsers(true)
  }

  const navigate = useNavigate();
  
  function logOut() {
    localStorage.clear();
    navigate('/login');
  }


  return (
    <div>
      <nav className="navbar">
        <button className="request-button" onClick={() => toggleReservations()}> Home </button>
        <button className="request-button" onClick={() => toggleInventory()}> Overzicht boeken </button>
        <button className="request-button" onClick={() => toggleUsers()}> Overzicht medewerkers </button>
        <span className="my-spacer"></span>
        <button className="request-button" onClick={() => logOut()}> Uitloggen </button>
      </nav>
      {showReservations ?
        <div className="main-container">
          <Reservations />
          <Loans type={"AdminLoans"} />
        </div>
        : showInventory ?
          <div className="main-container">
            <Inventaris type={"AdminInventory"} />
          </div> :
          showUsers ? <div className="main-container">
            <Users />
          </div> : null}
    </div>
  )
}

export default Adminpage
