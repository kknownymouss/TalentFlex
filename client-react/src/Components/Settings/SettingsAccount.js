import React, {useState, useEffect} from 'react'
import "../../static/css/Settings/SettingsAccount.css"
import { getServerToken, getUserToken } from '../CommonUtls'
import { SERVER_URL } from '../CommonUtls'
import {useMediaQuery} from "react-responsive"


function SettingsAccount() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmChangesPassword, setConfirmChangesPassword] = useState("")
    const [loading, setLoading] = useState(true)
    const [notMatching, setNotMatching] = useState(false)
    const [wrongOld, setWrongOld] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value)
    }

    function handleConfirmChangesChange(e) {
        setConfirmChangesPassword(e.target.value)
    }


    let req_body = {
        user_token: getUserToken(),
        server_token: getServerToken(),
    }

    useEffect(() => {
        setLoading(true)
        fetch(`${SERVER_URL}/get_settings_account`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {         
            if (res) {
                setEmail(res.email)
                setUsername(res.username)
                setLoading(false)
            } else if (res.status === "error 404 not found") {
                
            } else {
                
            }
            }).catch(err => {
            
        })
    }, [])

    function editSettingsAccount() {
        setConfirmLoading(true)
        let req_body_edit = {
            ...req_body,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            confirmChangesPassword: confirmChangesPassword   
        }
        fetch(`${SERVER_URL}/edit_settings_account`, {
        method: "POST",
        body: JSON.stringify(req_body_edit),
        headers: {
            "Content-Type": "application/json"
        },
        }).then(response => response.json()).then(res => {         
            if (res.status == "success") {
                window.location.reload()
            } else if (res.status === "not matching") {
                setNotMatching(true)
                setWrongOld(false)
                setConfirmLoading(false)
            } else if (res.status === "wrong old password") {
                setWrongOld(true)
                setNotMatching(false)
                setConfirmLoading(false)
            } else {

            }
            }).catch(err => {
            
        })
    }

    return (
        <div className="settings-account-wrap fade-in">
        {loading ? 
            <div style={{height: "520px", display: "flex",
            flexDirection: "column", justifyContent: "center",
            alignItems: "center"}}>
                <span style={{height: "3rem", width: "3rem", color: "#d69d00"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="sr-only"></span>
            </div> :
            <div className="fade-in">
            <p className="white medium-big light-heavy settings-account-header">Edit Account Settings</p>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "30px", padding: "30px 30px 30px 30px", backgroundColor: "var(--dark-yellow)"}}>
                <span className="material-icons white md-36" style={{marginRight: "10px"}}>key</span>
                <p className="white medium feed-zero-margin">Make changes to your account credentials. These changes will affect the way you login and how people can reach you. Make sure to confirm your changes.</p>
            </div>
            <div className="settings-account-creds">
                <p style={{marginBottom: "5px"}} className="white light-heavy medium feed-zero-margin">Username</p>
                <p className="small white">Your username is what makes you unique from other users. It is also used for finding you on the platform and mentioning in comments. <span style={{color: "var(--dark-yellow)"}} className="light-heavy">Usernames can't be changed.</span></p>
                <input style={{marginBottom: "2.5em"}} className="display-name-form light-heavy light-gray small-medium" type="text" value={username} disabled></input>
                <p style={{marginBottom: "5px"}} className="white light-heavy medium feed-zero-margin">Change Your Email Address</p>
                <p className="white small">Your email address is used for logging in and receiving emails from us. You will not receive any emails on the old email upon changing your email address.</p>
                <input style={{maxWidth: "300px", width: "300px", marginBottom: "2.5em"}} onChange={handleEmailChange} className="display-name-form light-heavy light-gray small-medium" type="text" value={email}></input>
                <p style={{marginBottom: "5px"}} className="white light-heavy medium feed-zero-margin">Set A New Password</p>
                <p className="white small">Be careful about your password changes and make sure to keep it in a safe place. It's your only way in.</p>
                <div style={{display: "flex", flexDirection: isPhone && !isTablet && !isDesktop ? "column" : "row", alignItems: isPhone && !isTablet && !isDesktop ? "flex-start" : "center", marginBottom: "1em"}}>
                    <input style={{marginRight: "5em", marginBottom: isPhone && !isTablet && !isDesktop ? "2em" : "0em"}} value={password} onChange={handlePasswordChange} placeholder="New Password" className="display-name-form light-heavy light-gray small-medium" type="password"></input>
                    <input value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password" className="display-name-form light-heavy light-gray small-medium" type="password"></input>
                </div>
                {notMatching ? <p className="fade-in light-heavy small-medium" style={{color: "#f74646"}}>Please make sure the new passwords entered are matching.</p> : null}
                <p style={{marginBottom: "5px", marginTop: "2em"}} className="medium light-heavy white feed-zero-margin">Confirm your changes</p>
                <p className="white small">To confirm your changes, please enter your current password and hit save.</p>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "1em"}}>
                    <input style={{marginRight: "5em"}} value={confirmChangesPassword} onChange={handleConfirmChangesChange} placeholder="Current Password" className="display-name-form light-heavy light-gray small-medium" type="password"></input>
                    {confirmLoading ? 
                        <button style={{minWidth: "60px"}} type="button" class="btn btn-settings-save white light-heavy">
                            <span style={{height: "1.2rem", width: "1.2rem", color: "white"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only"></span>
                        </button> :
                        <button onClick={editSettingsAccount} type="button" class="btn btn-settings-save white light-heavy">Confirm</button>
                        }
                </div> 
                {wrongOld ? <p className="fade-in light-heavy small-medium" style={{color: "#f74646"}}>Please make sure the old password is correct.</p> : null}
            </div>
            </div>}
        </div>
    )
}

export default SettingsAccount