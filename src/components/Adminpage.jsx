import React from 'react'
import Inventaris from './Inventaris'
import Users from './Users'
import Reservations from './Reservations'

function Adminpage() {

  return (
    <div className="main-container">
      <Inventaris type={"AdminInventory"} />
      <Reservations />
      <Users />
    </div>
  )
}

export default Adminpage
