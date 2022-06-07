import React from 'react'
import "../static/css/LoginCard.css"
import LoginCreds from './LoginCreds'
import LoginInfo from './LoginInfo'

function LoginCard() {
    return (
        <div className="login-card">
            <LoginInfo />
            <LoginCreds />
        </div>
    )
}

export default LoginCard