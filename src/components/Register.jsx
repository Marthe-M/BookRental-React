import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');
    const [registered, setRegistered] = useState(false);

    function registerUser() {
        const passwordCheck = /^(?=.*?[0-9]).{6,}$/;
        if (password !== password2) {
            setMessage('Wachtwoorden komen niet overeen.');
        } else if (!password.match(passwordCheck)) {
            setMessage("Wachtwoord moet meer dan 6 karakters hebben en één getal bevatten.");
        } else {
            let userToRegister = {
                username,
                password,
                email
            }
            fetch(`https://localhost:7211/api/Registration`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userToRegister)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 400) {
                    setMessage('Gebruikersnaam bestaat al.');
                } else {
                    setMessage('Incorrect emailadres.');
                }
            })
                .then((result) => {
                    setRegistered(true);
                })
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
                {message ? <span className="incorrect">{message}</span> : null}
                <button type="submit" className="login-button">Registeren</button>
            </form>
            {registered ? <div className="inventaris-add-container"><h2>Registratie is gelukt!</h2>
            <div> <button className="basic-button" onClick={() => navigate('/login')}>Ok</button> </div></div> : null}
        </div>
    )
}

export default Register
