import React, { useState } from 'react';
import Inventaris from './Inventaris'
import Users from './Users'
import Reservations from './Reservations'
import Loans from './Loans'

function Adminpage() {


  return (
    <div className="main-container">
      <Reservations />
      <Loans type={"AdminLoans"}/>
      <Inventaris type={"AdminInventory"}/>
      <Users />
     </div>
  )
}

export default Adminpage
