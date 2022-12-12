import React, { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    function registerUser() {
        console.log("register:" + email, username, password)
        if(password === password2) {
            let userToRegister = {
                username,
                password,
                email
            }
            fetch(`https://localhost:7211/api/User/register`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userToRegister)
            })
            setEmail('');
            setUsername('');
            setPassword('');
            setPassword2('');
        } else {
            alert('Wachtwoorden komen niet overeen')
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