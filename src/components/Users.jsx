import React, { useState, useEffect } from 'react';
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { MdLibraryAdd } from "react-icons/md";

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

  function getAllUsers() {
    fetch("https://localhost:7211/api/User").then(res => res.json()).then(data => setUserData(data))
  }

  function addUser() {
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
    fetch("https://localhost:7211/api/User/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    setAddModus(false)
  }

  function showDeletePopUp(user) {
    setfirstName(user.firstName)
    setDeleteId(user.id)
    setDeleteModus(true)
  }

  function deleteUser(id) {
    fetch(`https://localhost:7211/api/User/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
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
    let newUser = {
      id: updatedId,
      firstName,
      lastName,
      email
    }
    fetch(`https://localhost:7211/api/User/${newUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    setfirstName('');
    setlastName('');
    setemail('');
    setUpdatedId();
    setUpdateModus(false)
    setAddModus(false)
  }

function leaveScreen () {
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



  useEffect(() => {
    getAllUsers()
  }, [userData])

  const listItemsTable =
    userData &&
    userData
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
          <input type='text' placeholder="Zoek..." />
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
              <th>Voornaam</th>
              <th>Achternaam</th>
              <th>Email</th>
              <th>Update</th>
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
          <button className="basic-button" onClick={() => leaveScreen() }>Annuleren</button>
          </div>
        </form>

      </div> : null}
      {deleteModus ? <div className="inventaris-add-container"><h2>Weet je zeker dat je {firstName} uit het systeem wil halen?</h2>
      <div><button type="submit" className="basic-button" onClick={() => deleteUser(deleteId)}>Verwijder user</button>
      <button className="basic-button" onClick={() => setDeleteModus(false)}>Annuleren</button> </div></div> : null}
    </div>
  )
}

export default Users