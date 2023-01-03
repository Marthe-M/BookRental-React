import React, { useState, useEffect } from 'react';
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { MdLibraryAdd } from "react-icons/md";
import jwt_decode from "jwt-decode";
import * as _ from "lodash";

function Inventaris({type, reservationData, setReservationData}) {
  const [bookData, setBookData] = useState([]);
  const [query, setQuery] = useState('');
  const [checked, setChecked] = useState(true);
  const [col, setCol] = useState('');
  const [ascending, setAscending] = useState(true);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [updateModus, setUpdateModus] = useState(false);
  const [updatedId, setUpdatedId] = useState()
  const [addModus, setAddModus] = useState(false)
  const [deleteModus, setDeleteModus] = useState(false)
  const [confirmationModus, setConfirmationModus] = useState(false)
  const [deleteId, setDeleteId] = useState()

  const userIdFromToken = jwt_decode(localStorage.getItem('token'))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
 
  function getReservations() {
    const token = localStorage.getItem("token")
    fetch(`https://localhost:7211/api/Reservation/${userIdFromToken}`, {
      method: 'get',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
      }}).then(res => res.json()).then(data =>
      setReservationData(data.map(reservation => ({...reservation.book, id: reservation.id})))
      
    )
  }

  function addReservation(bookId) {
    const token = localStorage.getItem("token")
     fetch("https://localhost:7211/api/Reservation/add", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `bearer ${token}`
       },
       body: JSON.stringify(
         {
           "userId": userIdFromToken,
           "bookId": bookId,
           "approved": false
         }
       )
     }).then(setTimeout(() => {getReservations(); setConfirmationModus(true)}, 500))
   }

   function deleteReservation(id) {
    const token = localStorage.getItem("token")
      fetch(`https://localhost:7211/api/Reservation/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      }).then(setTimeout(() => getReservations(), 500))
    }

  function getAllBooks() {
    const token = localStorage.getItem("token")
    fetch("https://localhost:7211/api/Book", {
      method: 'get',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
      }}).then(res => res.json()).then(data => setBookData(data))
  }

  function addBook() {
    const token = localStorage.getItem("token")
    let newBook = {
      title,
      author,
      isbn
    }
    setTitle('');
    setAuthor('');
    setIsbn('');
    fetch("https://localhost:7211/api/Book/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      body: JSON.stringify(newBook)
    }).then(setTimeout(() => getAllBooks(), 500))
    setAddModus(false)
  }

  function showDeletePopUp(book) {
    setTitle(book.title)
    setDeleteId(book.id)
    setDeleteModus(true)
  }

  function deleteBook(id) {
    const token = localStorage.getItem("token")
    fetch(`https://localhost:7211/api/Book/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(setTimeout(() => getAllBooks(), 500))
    setTitle('');
    setDeleteId();
    setDeleteModus(false)
  }

  function updateBook(book) {
    setAddModus(true)
    setUpdateModus(true)
    setUpdatedId(book.id)
    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
    
  }

  function sendBookUpdate() {
    const token = localStorage.getItem("token")
      let newBook = {
      id: updatedId,
      title,
      author,
      isbn
    }
    fetch(`https://localhost:7211/api/Book/${newBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      body: JSON.stringify(newBook)
    }).then(setTimeout(() => getAllBooks(), 500))
    setTitle('');
    setAuthor('');
    setIsbn('');
    setUpdatedId();
    setUpdateModus(false)
    setAddModus(false)
    }

function leaveScreen () {
  setTitle('');
  setAuthor('');
  setIsbn('');
  setUpdatedId();
  setDeleteId();
  setUpdateModus(false)
  setAddModus(false)
}

function filter(data) {
  var filtered = data.filter((item) => {
    return (item.author.toLowerCase().indexOf(query) !== -1 || item.title.toLowerCase().indexOf(query) !== -1)
        && (!checked || item.isAvailable);
  })
  return _.orderBy(filtered, col, ascending ? "asc" : "desc")
}

function search(event) {
  setQuery(event.target.value.toLowerCase())
}

function checkbox(event) {
  setChecked(event.target.checked)
}

  useEffect(() => {
    type === "Reservations" ? getReservations() : getAllBooks()
  }, [])

  const data = type === "Reservations" ? reservationData : filter(bookData);

  const listItemsTable =
    data &&
    data
      .map(book => (
        <tr key={book.id} >
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.isbn}</td>
        
          <td className="table-buttons">
            {type === "AdminInventory" ?
            <>
              <span onClick={() => updateBook(book)}><BsPencilFill className="icon" /></span>
              <span onClick={() => showDeletePopUp(book)}><BsTrashFill className="icon" /></span>
            </>
            : type === "UserInventory" ?
            <button className="request-button" onClick={() => addReservation(book.id)}> Aanvragen </button>
            : type === "Reservations" ?
            <button className="request-button" onClick={() => deleteReservation(book.id)}> Annuleren </button>
            : null
            }
          </td>
        </tr>
      ))

  return (
    <div className="inventaris-container">
      <div>
        <div className="inventaris-header">
          {type === "Reservations" ?
          <><h4>BEKIJK OVERZICHT</h4>
          <h2>Reserveringen</h2></>
          : <><h4>BEKIJK INVENTARIS</h4>
          <h2>Boeken</h2></>
          }

        </div>
       {type === "Reservations" ? null : <div className="inventaris-searchbar">
          <input type='text' placeholder="Zoek..." onChange={search} />
     
          <div><label>
            Beschikbaar:
            <input
              name="isAvailable"
              type="checkbox"
              defaultChecked={true}
              onChange={checkbox}
            />
          </label></div>
          {type === "AdminInventory" ?
          <h3>Voeg nieuw boek toe<MdLibraryAdd className="icon" onClick={() => setAddModus(true)} />  </h3>
         : null}
        </div>} 
        <table className="inventaris-table">
          <thead>
            <tr>
              <th><span onClick={() => {setCol("title"); setAscending(!ascending)}}> Title {col === "title" ? ascending ? "▼" : "▲" : null} </span></th>
              <th><span onClick={() => {setCol("author"); setAscending(!ascending)}}> Author {col === "author" ? ascending ? "▼" : "▲" : null} </span></th>
              <th><span onClick={() => {setCol("isbn"); setAscending(!ascending)}}> Isbn {col === "isbn" ? ascending ? "▼" : "▲" : null} </span></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listItemsTable}
          </tbody>
        </table>
      </div>

      {addModus ? <div className="inventaris-add-container">
        <h2>{updateModus ? 'Update Book' : 'Add New Book'}</h2>
        <form className="inventaris-add-form" onSubmit={(e) => {
          e.preventDefault();
          if (updateModus === false) {
            addBook();
          } else {
            sendBookUpdate()
          }
        }}>    <label>Title:</label><input type='text' value={title} onChange={(e) => {
          setTitle(e.target.value);
        }} />
          <label>Author:</label><input type='text' value={author} onChange={(e) => {
            setAuthor(e.target.value);
          }} />
          <label>Isbn:</label><input type='text' value={isbn} onChange={(e) => {
            setIsbn(e.target.value);
          }} />
          <div>       <button type="submit" className="basic-button">{updateModus ? 'Update Book' : 'Add New Book'}</button>
          <button className="basic-button" onClick={() => leaveScreen() }>Annuleren</button></div>

        </form>

      </div> : null}
      {deleteModus ? <div className="inventaris-add-container"><h2>Weet je zeker dat je {title} uit het systeem wil halen?</h2>
      <div><button type="submit" className="basic-button" onClick={() => deleteBook(deleteId)}>Verwijder boek</button>
      <button className="basic-button" onClick={() => setDeleteModus(false)}>Annuleren</button> </div></div> : null}
      {confirmationModus ? <div className="inventaris-add-container"><h2>Boek succesvol aangevraagd!</h2>
      <div> <button className="basic-button" onClick={() => setConfirmationModus(false)}>Ok</button> </div></div> : null}
    </div>
  )
}

export default Inventaris
