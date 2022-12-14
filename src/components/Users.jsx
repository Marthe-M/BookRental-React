import React, { useState, useEffect } from 'react';
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { MdLibraryAdd } from "react-icons/md";
import * as _ from "lodash";

function Users() {
  const [userData, setUserData] = useState([]);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [updateModus, setUpdateModus] = useState(false);
  const [updatedId, setUpdatedId] = useState()
  const [addModus, setAddModus] = useState(false)
  const [deleteModus, setDeleteModus] = useState(false)
  const [deleteId, setDeleteId] = useState()
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [col, setCol] = useState('firstName');
  const [ascending, setAscending] = useState(true);

  function getAllUsers() {
    const token = localStorage.getItem("token")
    fetch(`${process.env.REACT_APP_API_URL}/api/User`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(res => res.json()).then(data => setUserData(data))
  }

  function addUser() {
    const token = localStorage.getItem("token")
    let newUser = {
      firstName,
      lastName,
      email,
      isAdmin: checked,

    }
    setfirstName('');
    setlastName('');
    setemail('');
    setChecked(false);
    fetch(`${process.env.REACT_APP_API_URL}/api/User/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      body: JSON.stringify(newUser)
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      setMessage('Gebruiker bestaat al.');
    }).then(setTimeout(() => getAllUsers(), 500))
    setAddModus(false)
    sendEmail(newUser.email)
  }

  function sendEmail(email) {
    fetch(`${process.env.REACT_APP_API_URL}/api/Email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    }).then((response) => {
      if (response.ok) {
       setMessage('Nieuwe gebruiker aangemaakt en email voor registratie verstuurd.')
      }
  
    })
  }


  function showDeletePopUp(user) {
    setfirstName(user.firstName)
    setDeleteId(user.id)
    setDeleteModus(true)
  }

  function deleteUser(id) {
    const token = localStorage.getItem("token")
    fetch(`${process.env.REACT_APP_API_URL}/api/User/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(setTimeout(() => getAllUsers(), 500))
    setfirstName('');
    setDeleteId();
    setDeleteModus(false)
  }

  function updateUser(user) {
    setAddModus(true)
    setUpdateModus(true)
    setUpdatedId(user.id)
    setfirstName(user.firstName)
    setlastName(user.lastName)
    setemail(user.email)
  }

  function sendUserUpdate() {
    const token = localStorage.getItem("token")
    let newUser = {
      id: updatedId,
      firstName,
      lastName,
      email
    }
    fetch(`${process.env.REACT_APP_API_URL}/api/User/${newUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      body: JSON.stringify(newUser)
    }).then(setTimeout(() => getAllUsers(), 500))
    setfirstName('');
    setlastName('');
    setemail('');
    setUpdatedId();
    setUpdateModus(false)
    setAddModus(false)
  }

  function leaveScreen() {
    setfirstName('');
    setlastName('');
    setemail('');
    setUpdatedId();
    setDeleteId();
    setUpdateModus(false)
    setAddModus(false)
  }

  const handleChange = () => {
    setChecked(!checked);
  };

  function filter(data) {
    var filtered = data.filter((item) => {
      return (item.firstName.toLowerCase().indexOf(query) !== -1 || item.lastName.toLowerCase().indexOf(query) !== -1
              || item.email.toLowerCase().indexOf(query) !== -1);
    })
    return _.orderBy(filtered, [user => user[col].toLowerCase()], ascending ? "asc" : "desc")
  }
  
  function search(event) {
    setQuery(event.target.value.toLowerCase())
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const listItemsTable =
    userData &&
    filter(userData)
      .map(user => (
        <tr key={user.id} className="red">
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td className="table-buttons">
            <span onClick={() => updateUser(user)}><BsPencilFill className="icon red" /></span>
            <span onClick={() => showDeletePopUp(user)}><BsTrashFill className="icon red" /></span>
            </td>
        </tr>
      ))

  return (
    <div className="inventaris-container">
      <div>
        <div className="inventaris-header red">
          <h4>BEKIJK OVERZICHT</h4>
          <h2>Gebruikers</h2>
        </div>
        <div className="inventaris-searchbar">
          <input type='text' placeholder="Zoek..." onChange={search} />
          <div><label>
            In dienst:
            <input
              name="isAvailable"
              type="checkbox"
              defaultChecked={true}
            />
          </label></div>
          <h3>Voeg nieuwe gebruiker toe<MdLibraryAdd className="icon red" onClick={() => setAddModus(true)} />  </h3>
        </div>
        <table className="inventaris-table">
          <thead>
            <tr className="red">
            <th><span onClick={() => {setCol("firstName"); setAscending(!ascending)}}> Voornaam {col === "firstName" ? ascending ? "???" : "???" : null} </span></th>
            <th><span onClick={() => {setCol("lastName"); setAscending(!ascending)}}> Achternaam {col === "lastName" ? ascending ? "???" : "???" : null} </span></th>
            <th><span onClick={() => {setCol("email"); setAscending(!ascending)}}> Email {col === "email" ? ascending ? "???" : "???" : null} </span></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listItemsTable}
          </tbody>
        </table>

      </div>

      {addModus ? <div className="inventaris-add-container">
        <h2>{updateModus ? 'Update User' : 'Add New User'}</h2>
        <form className="inventaris-add-form" onSubmit={(e) => {
          e.preventDefault();
          if (updateModus === false) {
            addUser();
          } else {
            sendUserUpdate()
          }
        }}>    <label>Voornaam:</label><input type='text' value={firstName} onChange={(e) => {
          setfirstName(e.target.value);
        }} />
          <label>Achternaam:</label><input type='text' value={lastName} onChange={(e) => {
            setlastName(e.target.value);
          }} />
          <label>Email:</label><input type='text' value={email} onChange={(e) => {
            setemail(e.target.value);
          }} />
          <label>Gebruiker aanmerken als Admin?
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
            />
            Ja
          </label>
          <div>
            <button type="submit" className="basic-button">{updateModus ? 'Update User' : 'Add New User'}</button>
            <button className="basic-button" onClick={() => leaveScreen()}>Annuleren</button>
          </div>
        </form>

      </div> : null}
      {deleteModus ? <div className="inventaris-add-container"><h2>Weet je zeker dat je {firstName} uit het systeem wil halen?</h2>
        <div><button type="submit" className="basic-button" onClick={() => deleteUser(deleteId)}>Verwijder user</button>
          <button className="basic-button" onClick={() => setDeleteModus(false)}>Annuleren</button> </div></div> : null}
      {message ? <div className="inventaris-add-container"><h2>{message}</h2>
      <div> <button className="basic-button" onClick={() => setMessage('')}>Ok</button> </div></div> : null}
    </div>
  )
}

export default Users
