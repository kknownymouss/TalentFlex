import React from 'react'
import "../static/css/SignupCard.css"
import LoginInfo from './LoginInfo'
import SignupCreds from './SignupCreds'

function SignupCard() {
    return (
        <div className="signup-card">
            <LoginInfo />
            <SignupCreds />
        </div>
    )
}

export default SignupCard