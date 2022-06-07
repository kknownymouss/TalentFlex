import React from 'react'
import LoginCard from './LoginCard'
import "../static/css/LoginLanding.css"
function LoginLanding() {
    return (
        <div className="login-wrap fade-in" style={{backgroundImage: `url(https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582692/TalentFlex_Static/Others/bg-idea2_ghyxaj.jpg)`}}>
            <LoginCard />
        </div>
    )
}

export default LoginLanding