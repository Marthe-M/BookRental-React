import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

function Loans({type}) {
  const [loanData, setLoanData] = useState([]);

  function getAllLoans() {
    const token = localStorage.getItem("token")
    fetch("https://localhost:7211/api/Loan", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(res => res.json()).then(data => setLoanData(data))
  }

function completeLoan(id) {
      console.log(id)
}

/*  
function getLoansById() {
  const userIdFromToken = jwt_decode(localStorage.getItem('token'))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
  const token = localStorage.getItem("token")
  fetch(`https://localhost:7211/api/Loan/${userIdFromToken}`, {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
    }}).then(res => res.json()).then(data =>
      setLoanData(data.map(loan => ({...loan.book, id: loan.id})))
    
  )
} */

useEffect(() => {
 getAllLoans() 
}, [])


  const listItemsTable =
    loanData &&
    loanData
      .map(loan => (
        <tr key={loan.id}>
          <td>{loan.book.title}</td>
          <td>{loan.book.author}</td>
          <td>{loan.user.firstName + " "} {loan.user.lastName}</td>
          <td>{loan.startDate.split('T').shift()}</td>
          <td className="table-buttons">
              <button className="request-button" onClick={() => completeLoan(loan.id)}> Aanmerken als voltooid </button>
          </td>
        </tr>
      ))

  return (
    <div className="inventaris-container">
      <div>
        <div className="inventaris-header">
          <h4>BEKIJK OVERZICHT</h4>
          <h2>Uitgeleende boeken</h2>
        </div>
        <table className="inventaris-table">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Auteur</th>
              <th>Geleend door:</th>
              <th>Geleend op:</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listItemsTable}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Loans
