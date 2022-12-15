import React from 'react'
import Inventaris from './Inventaris'

function Userpage() {
  return (
    <div>
      <Inventaris type={"UserInventory"}/>
      <Inventaris type={"Reservations"}/>
    </div>
  )
}

export default Userpage
