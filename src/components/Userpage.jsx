import React, { useState } from 'react';
import Inventaris from './Inventaris'
import Loans from './Loans'
import { useNavigate } from "react-router-dom"

function Userpage() {
  const [reservationData, setReservationData] = useState([]);
  const [showInventory, setShowInventory] = useState(true)
  const [showReservations, setShowReservations] = useState(false)
  const [showLoans, setShowLoans] = useState(false)

  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate('/login');
  }

  function toggleInventory () {
    setShowInventory(true)
    setShowReservations(false)
    setShowLoans(false)
  }

  function toggleReservations() {
    setShowInventory(false)
    setShowReservations(true)
    setShowLoans(false)
  }


  function toggleLoans() {
    setShowInventory(false)
    setShowReservations(false)
    setShowLoans(true)
  }



  return (
    <div>
      <nav className="navbar">
        <button className="request-button" onClick={() => toggleInventory()}> Home </button>
        <button className="request-button" onClick={() => toggleReservations()}> Reserveringen </button>
        <button className="request-button" onClick={() => toggleLoans()}> Geleende boeken </button>
        <span className="my-spacer"></span>
        <button className="request-button" onClick={() => logOut()}> Uitloggen </button>
      </nav>

      {showInventory ?
        <div className="main-container"> <Inventaris type={"UserInventory"} setReservationData={setReservationData} />
          
        </div> :
        showLoans ?
          <div className="main-container">
            <Loans type={"UserLoans"} />  </div> :
            showReservations ?
            <div className="main-container">
            <Inventaris type={"Reservations"} reservationData={reservationData} setReservationData={setReservationData} />
          </div>
          : null}
    </div>
  )
}

export default Userpage
