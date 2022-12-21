import React, { useState } from 'react';
import Inventaris from './Inventaris'
import Loans from './Loans'

function Userpage() {
  const [reservationData, setReservationData] = useState([]);

  return (
    <div className="userpage-container">
      <Inventaris type={"UserInventory"} setReservationData={setReservationData}/>
      <Inventaris type={"Reservations"} reservationData={reservationData} setReservationData={setReservationData}/>
      {/* <Loans type={"UserLoans"}/> */}
    </div>
  )
}

export default Userpage
