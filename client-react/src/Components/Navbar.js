import React from 'react'
import "../static/css/Navbar.css"
import { Link } from 'react-router-dom'

function Navbar(props) {
    let NavbarItems = ["Home", "About", "Contact"]
    let NavbarImages = {
        "Home": "home",
        "About": "info",
        "Contact": "contact_support"
    }
    return(
        <div className="main-navbar">
            <div className="start-navbar">
                <h2 style={{fontFamily: 'Trebuchet MS', marginLeft: "6px"}} className="white light-heavy large no-padding-margin">Talent<span className="light-dark-green">Flex.</span></h2>
            </div>
            <div className="mid-navbar">
                {NavbarItems.map(function(value) { 
                    let active = ""
                    if (value === props.attr.activeLink) {
                        active = "active-link"
                    }
                    return (
                        <div className="navbar-options">
                            <span className="img-margin material-icons md-24 white">{NavbarImages[value]}</span>
                            <Link to={`/${value.toLowerCase()}`} className={`no-padding-margin no-decoration small ${active}`}>
                                {value}
                            </Link>
                        </div>)})
                    }
                    
            </div>
            <div className="end-navbar">
                <Link to="/login" className="no-padding-margin no-decoration medium login-but">Login</Link>
                <Link to="/signup">
                    <button type="button" class="btn btn-light signup-but small light-heavy">Sign Up</button>
                </Link>
            </div>
        </div>
    )
}


export default Navbar