import React from 'react'
import Inventaris from './Inventaris'
import Users from './Users'

function Adminpage() {

  return (
    <div className="main-container">
      <Inventaris type={"AdminInventory"}/>
      <Users />
    </div>
  )
}

export default Adminpage
