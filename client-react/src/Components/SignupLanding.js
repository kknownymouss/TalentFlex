import React from 'react'
import SignupCard from './SignupCard'
import "../static/css/SignupLanding.css"
function SignupLanding() {
    return (
        <div className="signup-wrap fade-in" style={{backgroundImage: `url(https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582692/TalentFlex_Static/Others/bg-idea2_ghyxaj.jpg)`}}>
            <SignupCard />
        </div>
    )
}

export default SignupLanding