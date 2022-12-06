import React from 'react'
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="login-container">
            <label>Naam:</label><input type='text' />
            <label>Wachtwoord:</label><input type='text' />
            <div className="login-button"><Link to="main">Login</Link></div>
        </div>
    )
}

export default Login