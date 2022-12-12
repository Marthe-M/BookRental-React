import React from 'react'
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="input-container">
            <div className="login-header">
                <h4>INLOG SCHERM</h4>
                <h2>Boeken reserveren</h2>
            </div>
            <div className="login-input">
                <input type='text' placeholder="Gebruikersnaam*" />
                <input type='password' placeholder="Wachtwoord*" />
                <div className="login-button"><Link to="main">Login</Link></div>
            </div>
        </div>
    )
}

export default Login