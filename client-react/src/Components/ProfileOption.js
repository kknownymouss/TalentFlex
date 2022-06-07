import React, {useState, useEffect} from 'react'
import "../static/css/ProfileOption.css"
import {removeUserSession, getServerToken, getUserToken, getTheme, setTheme} from "./CommonUtls"
import {Redirect } from 'react-router-dom'
import { SERVER_URL } from './CommonUtls'

function ProfileOption(props) {
    const [logout, setLogout] = useState(false)
    const [darkOn, setdarkOn] = useState(false)
    
    useEffect(() => {
        if (getTheme() === "feed-wrap-dark-white") {
            setdarkOn(false)
        } else if ("feed-wrap-light-black") {
             setdarkOn(true)
        }
    }, [])

    function handleClick() {
        let req_body = {
            user_token: getUserToken(),
            server_token: getServerToken()
        }
        if (props.attr.func === "logout") {
            fetch(`${SERVER_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req_body)
            }).then(response => response.json()).then(res => {
                if (res["status"] === "logout successful") {
                    removeUserSession()
                    setLogout(true)
                }
            })
        } else if (props.attr.func === "dark_mode") {
            let target_white = document.getElementsByClassName("feed-wrap-dark-white")[0]
            let target_black = document.getElementsByClassName("feed-wrap-light-black")[0]
            if (getTheme() === "feed-wrap-dark-white") {
                setTheme("feed-wrap-light-black")
                target_white.className = "feed-wrap-light-black"
                setdarkOn(true)
            } else {
                setTheme("feed-wrap-dark-white")
                target_black.className = "feed-wrap-dark-white"
                setdarkOn(false)
            }
        }
    }
    return (
        <div className="profile-more-option"  onClick={handleClick}>
        {logout ? <Redirect to="/login" /> : null}
            <span className="material-icons md-24 white" style={{height: "24px", width: "24px"}}>{props.attr.img}</span>
            <p style={{textAlign:"left", marginLeft: "10px", userSelect:"none"}} className="small-medium white feed-zero-margin">{
                (props.attr.text).length === 0 ? darkOn ? "Dark Mode: On" : "Dark Mode: Off" : props.attr.text
            }</p>
        </div>
    )
}

export default ProfileOption