import React from 'react'
import Inventaris from './Inventaris'
import Users from './Users'

function Main() {

  return (
    <div className="main-container">
      {(localStorage.getItem('role') === 'admin') ?
        <div>
          <Inventaris />
          <Users />
        </div>
        : <div>
          <Inventaris />
        </div>}

    </div>
  )
}

export default Main