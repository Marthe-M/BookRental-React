import React, { useState, useEffect } from 'react';
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { MdLibraryAdd } from "react-icons/md";

function Inventaris() {
  const [bookData, setBookData] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [updateModus, setUpdateModus] = useState(false);
  const [updatedId, setUpdatedId] = useState()
  const [addModus, setAddModus] = useState(false)
  const [deleteModus, setDeleteModus] = useState(false)
  const [deleteId, setDeleteId] = useState()

  function getAllBooks() {
    fetch("https://localhost:7211/api/Book").then(res => res.json()).then(data => setBookData(data))
  }

  function addBook() {
    let newBook = {
      title,
      author,
      isbn,
    }
    setTitle('');
    setAuthor('');
    setIsbn('');
    fetch("https://localhost:7211/api/Book/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    })
    setAddModus(false)
  }

  function showDeletePopUp(book) {
    setTitle(book.title)
    setDeleteId(book.id)
    setDeleteModus(true)
  }

  function deleteBook(id) {
    fetch(`https://localhost:7211/api/Book/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
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
      let newBook = {
      id: updatedId,
      title,
      author,
      isbn
    }
    fetch(`https://localhost:7211/api/Book/${newBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    })
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


  useEffect(() => {
    getAllBooks()
  }, [bookData])

  const listItemsTable =
    bookData &&
    bookData
      .map(book => (
        <tr key={book.id} >
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.isbn}</td>
          <td className="table-buttons">
            <span onClick={() => updateBook(book)}><BsPencilFill className="icon" /></span>
            <span onClick={() => showDeletePopUp(book)}><BsTrashFill className="icon" /></span>
          </td>
        </tr>
      ))

  return (
    <div className="inventaris-container">
      <div>
        <div className="inventaris-header">
          <h4>BEKIJK INVENTARIS</h4>
          <h2>Boeken</h2>
        </div>
        <div className="inventaris-searchbar">
          <input type='text' placeholder="Zoek..." />
          <div><label>
            Beschikbaar:
            <input
              name="isAvailable"
              type="checkbox"
              defaultChecked={true}
            />
          </label></div>
          <h3>Voeg nieuw boek toe<MdLibraryAdd className="icon" onClick={() => setAddModus(true)} />  </h3>
        </div>
        <table className="inventaris-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Isbn</th>
              <th>Update</th>
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
    </div>
  )
}

export default Inventaris