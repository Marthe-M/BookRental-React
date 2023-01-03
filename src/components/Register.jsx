import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    function registerUser() {
        const passwordCheck = /^(?=.*?[0-9]).{6,}$/;
        if (password !== password2) {
            alert('Wachtwoorden komen niet overeen')
        } else if (!password.match(passwordCheck)) {
            alert("Wachtwoord moet meer dan 6 karakters hebben en één getal bevatten")
        } else {
            let userToRegister = {
                username,
                password,
                email
            }
            fetch(`${process.env.REACT_APP_API_URL}/api/Registration`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userToRegister)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 400) {
                    throw new Error('Username bestaat al');
                } else {
                    throw new Error('Emailadres incorrect');
                }
            })
                .then((result) => {
                    alert('Registratie is gelukt.')
                    setUsername('');
                    setPassword('');
                    setPassword2('');
                    navigate('/login');
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    return (
        <div className="input-container">
            <div className="login-header">
                <h4>REGISTREER SCHERM</h4>
                <h2>Boeken reserveren</h2>
            </div>
            <form className="login-input" onSubmit={(e) => {
                e.preventDefault()
                registerUser()
            }}>
                <input type='text' placeholder="Emailadres*" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <input type='text' placeholder="Kies een gebruikersnaam*" value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }} />
                <input type='password' placeholder="Kies een wachtwoord*" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                <input type='password' placeholder="Herhaal wachtwoord*" value={password2} onChange={(e) => {
                    setPassword2(e.target.value);
                }} />
                <button type="submit" className="login-button">Registeren</button>
            </form>
        </div>
    )
}

export default Register