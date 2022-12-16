import React, { useState, useEffect } from 'react';
import Inventaris from './Inventaris'

function Userpage() {
  const [reservationData, setReservationData] = useState([]);

  return (
    <div className="userpage-container">
      <Inventaris type={"UserInventory"} setReservationData={setReservationData}/>
      <Inventaris type={"Reservations"} reservationData={reservationData} setReservationData={setReservationData}/>
    </div>
  )
}

export default Userpage
