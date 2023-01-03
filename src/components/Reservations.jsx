import React, { useState, useEffect } from 'react';

function Reservations() {
  const [reservationData, setReservationData] = useState([]);
  const [message, setMessage] = useState('');

  function getAllReservations() {
    const token = localStorage.getItem("token")
    fetch(`${process.env.REACT_APP_API_URL}/api/Reservation`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(res => res.json()).then(data => setReservationData(data))
  }

  function addLoan(reservation) {
    const token = localStorage.getItem("token")
    fetch(`${process.env.REACT_APP_API_URL}/api/Loan/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      body: JSON.stringify(
        {
          "userId": reservation.user.id,
          "bookId": reservation.book.id
        }
      )
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        setMessage('Boek is niet beschikbaar.');
      } else {
        setMessage('Er is iets fout gegaan.');
      }
    })
      .then(setTimeout(() => deleteReservation(reservation.id), 500))
      .then(setTimeout(() => window.location.reload(), 500))
  }


function deleteReservation(id) {
  const token = localStorage.getItem("token")
  fetch(`${process.env.REACT_APP_API_URL}/api/Reservation/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    }
  }).then(setTimeout(() => getAllReservations(), 500))
}



useEffect(() => {
  getAllReservations()
}, [])

const listItemsTable =
  reservationData &&
  reservationData
    .map(reservation => (
      <tr key={reservation.id}>
        <td>{reservation.book.title}</td>
        <td>{reservation.book.author}</td>
        <td>{reservation.user.firstName + " "} {reservation.user.lastName}</td>
        <td className="table-buttons">
          <button className="request-button" onClick={() => addLoan(reservation)}> Accepteren </button>
          <button className="request-button" onClick={() => deleteReservation(reservation.id)}> Annuleren </button>
        </td>
      </tr>
    ))

return (
  <div className="inventaris-container">
    <div>
      <div className="inventaris-header">
        <h4>BEKIJK OVERZICHT</h4>
        <h2>Openstaande reserveringen</h2>
      </div>
      <table className="inventaris-table">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Auteur</th>
            <th>Aangevraagd door:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listItemsTable}
        </tbody>
      </table>
    </div>
    {message ? <div className="inventaris-add-container"><h2>{message}</h2>
    <div> <button className="basic-button" onClick={() => setMessage('')}>Ok</button> </div></div> : null}
  </div>
)
}

export default Reservations
