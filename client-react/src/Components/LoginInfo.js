import React from 'react'
import "../static/css/LoginInfo.css"
function LoginInfo() {
    return (
        <div className="login-info">
            <img className="login-img" src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582719/TalentFlex_Static/Others/try_nfuwnu.png"} />
            
            <ul>
                <li className="li-login white light-heavy small">Easily post any time you want.</li>
                <li className="li-login white light-heavy small">Recieve interactions and feedback.</li>
                <li className="li-login white light-heavy small">Share your talent with the world.</li>
            </ul>
        </div>
    )
}

export default LoginInfo