import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    async function loginUser() {
        let userToLogin = {
            username,
            password
        }
        fetch(`${process.env.REACT_APP_API_URL}/api/Login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userToLogin)
        }).then((response) => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Gegevens incorrect');
        })
            .then((result) => {
                localStorage.setItem('token', result);
                const decodedToken = jwt_decode(result)
                const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                if(role === "True") {
                    localStorage.setItem('role', 'admin');
                    setUsername('');
                    setPassword('');
                    navigate('/adminpage');
                } else {
                    localStorage.setItem('role', 'user');
                    setUsername('');
                    setPassword('');
                    navigate('/userpage');
                }
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