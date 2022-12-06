import React, { useState, useEffect } from 'react';
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";

function BookOverview() {
  const [bookData, setBookData] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [updateModus, setUpdateModus] = useState(false);
  const [updatedId, setUpdatedId] = useState()
  

  function getAllBooks() {
    fetch("http://localhost:8082/book/all").then(res => res.json()).then(data => setBookData(data))
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
    fetch("http://localhost:8082/book/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    })
  }

  function deleteBook(id) {
    fetch(`http://localhost:8082/book/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function updateBook(book) {
    setUpdateModus(true)
    setUpdatedId(book.id)
    console.log(book)
    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
  }

  function sendBookUpdate () {
    console.log("Send update")
    let newBook = {
      id: updatedId,
      title,
      author,
      isbn
  }
    fetch(`http://localhost:8082/book/${newBook.id}/edit`, {
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
  }



  useEffect(() => {
    getAllBooks()
  }, [bookData])

  const listItemsTable =
    bookData &&
    bookData
      .map(book => (
        <tr key={book.id} >
          <td><h4>{book.id}</h4></td>
          <td><h4>{book.title}</h4></td>
          <td><h4>{book.author}</h4></td>
          <td><h4>{book.isbn}</h4></td>
          <td className="table-buttons">
            <h4 onClick={() => updateBook(book)}><BsPencilFill className="icon" /></h4>
            <h4 onClick={() => deleteBook(book.id)}><BsTrashFill className="icon" /></h4>
          </td>
        </tr>
      ))

  return (
    <div className="main-container">
    <div className="bookoverview-container">
      <div className="bookoverview_header">
        <h4>Reserveer een boek</h4>
        <h1>Inventaris</h1>
      </div>
      <div className="bookoverview-searchbar">
        <div> <label>Zoek:</label><input type='text' /></div>
        <div>  <label>Categorie:</label><select defaultValue="all">
          <option value="html">HTML</option>
          <option value="sql">SQL</option>
          <option value="Scrum">Scrum</option>
          <option value="java">Java</option>
          <option value="all">Alle categorieen</option>
        </select></div>
        <div>     <label>
          Beschikbaar:
          <input
            name="isAvailable"
            type="checkbox"
            defaultChecked={true}
          />
        </label></div>

      </div>
      <table className="bookoverview-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Isbn</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {listItemsTable}
        </tbody>
      </table>

    </div>
    <div className="book-add-container">
        <h2>{updateModus ? 'Update Book' : 'Add New Book'}</h2>
        <form className="book-add-form" onSubmit={(e) => {
      e.preventDefault();
            if(updateModus === false) {
              addBook();
            } else {
              sendBookUpdate()
            }
     }}>    <label>Title:</label><input type='text' value={title}  onChange={(e) => {
          setTitle(e.target.value);
        }} />
          <label>Author:</label><input type='text'  value={author} onChange={(e) => {
            setAuthor(e.target.value);
          }} />
          <label>Isbn:</label><input type='text' value={isbn} onChange={(e) => {
            setIsbn(e.target.value);
          }} />
          <button type="submit" className="basic-button">{updateModus ? 'Update Book' : 'Add New Book'}</button>
        </form>

      </div>
    </div>
  )
}

export default BookOverview