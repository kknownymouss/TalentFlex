import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import "../static/css/LoginCreds.css"
import AES256 from 'aes-everywhere'
import {setUserSession, getUserToken, isLogin, setTheme} from "./CommonUtls"
import { SERVER_URL } from './CommonUtls'

function LoginCreds() {
    const initialState = {
        email: "",
        password: "",
    }
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState(initialState)
    const [error, setError] = useState("")
    const [redirect, setRedirect] = useState(false)

    function handleChange(event) {
        setState({
            ...state,
            [event.target.name] : event.target.value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        let encryptedState = {}
        for (let key in state) {
            encryptedState[key] = AES256.encrypt(state[key], "PASSWORD")
        }
        
        fetch(`${SERVER_URL}/login_info_creds`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(encryptedState)
        }).then(response => response.json()).then(res => {
            setLoading(false)
            if (res['status'] != "user verified") {
                setError(res['status'])
            } else {
                setUserSession(res["server_token"], res["user_token"])
                setTheme("feed-wrap-dark-white")
                setState(initialState)
                setError("")
                setRedirect(true)

            }
        })
    }
    return (
        <div className="login-creds">
            {redirect ? <Redirect to="/feed/Random" /> : null}
            <h1 className="login-title heavy big white">Talent<span className="light-dark-green">Flex.</span></h1>
            <div className="main-login">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <input class="form-control light-heavy white login-forms" value={state.email} name="email" type="email" onChange={handleChange} placeholder="Email" required></input>
                    <input class="form-control light-heavy white login-forms" value={state.password} name="password" type="password" onChange={handleChange} placeholder="Password" required></input>
                    {error ? <p className={"diff-pass fade-in-error light-heavy dark-red small"}>{error}</p> : null }
                    {!loading ? <button type="submit" class="btn btn-success light-heavy green-creds-button">Login</button> :
                    <button class="btn btn-success light-heavy loading-button" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="sr-only"></span>
                    </button>}
                    <p className="no-account light-heavy small white">Don't have an account ?</p>
                    <Link to="/signup">
                        <button type="button" class="btn btn-light light-heavy white-creds-button">Sign Up</button>
                    </Link>
                </form>
            </div>
            
        </div>
    )
}

export default LoginCreds