import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser() {
        let userToLogin = {
            username,
            password
        }
        fetch(`https://localhost:7211/api/Login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userToLogin)
        }).then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Gegevens incorrect');
          })
          .then((result) => {
            console.log(result)
            setUsername('');
            setPassword('');
            navigate('/main');
          })
          .catch((error) => {
            alert(error)
          });
    }

    return (
        <div className="input-container">
            <div className="login-header">
                <h4>INLOG SCHERM</h4>
                <h2>Boeken reserveren</h2>
            </div>
            <form className="login-input" onSubmit={(e) => {
                e.preventDefault()
                loginUser()
            }}>
                <input type='text' placeholder="Gebruikersnaam*" value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }} />
                <input type='password' placeholder="Wachtwoord*" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    )
}

export default Login