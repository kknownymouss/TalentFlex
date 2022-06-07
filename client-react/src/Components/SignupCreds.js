import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "../static/css/SignupCreds.css"
import AES256 from 'aes-everywhere'
import { SERVER_URL } from './CommonUtls'

function SignupCreds() {
    const initialState = {
        email: "",
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
    }
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState(initialState)
    const [error, setError] = useState("")
    const [creation, setCreation] = useState(false)

    // This function checks if there is any space in the username
    function username_checker(username) {
        if (username.includes(" ")) {
            return false
        } else {
            return true
        }
    }

    // This function check if the chosen password is not weak
    function passwordChecker(pwd) {
        let upperCase = 0;
        let lowerCase = 0;
        let numbers = 0;
        for (let i of pwd) {
            if (parseInt(i)) {
            	numbers++;
            } else if (!/[^a-zA-Z]/.test(i)) {
                if (i == i.toLowerCase()) {
                  lowerCase++;
              } else if (i == i.toUpperCase()) {
                  upperCase++;
              }
            }
        }
        if (upperCase > 2 && lowerCase > 2 && numbers > 2 && pwd.length > 7) {
            return true
        } else {
            return false
        }
    }

   

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
        if (state.password === state.confirmPassword) {
            if (passwordChecker(state.password)) {
                if (username_checker(state.username)) {
                    setError("")
                    fetch(`${SERVER_URL}/signup_info_creds`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(encryptedState)
                    }).then(response => response.json()).then(res => {
                        setCreation(false)
                        setLoading(false)
                        if (res != "success") {
                            setError(res)
                        } else {
                            setState(initialState)
                            setError("")
                            setCreation(true)
                        }
                    })
                } else {
                    setLoading(false)
                    setError("Please make sure that there is no space in your chosen username.")
                }
            } else {
                setLoading(false)
                setError("Please make sure there is at least 3 uppercase, 3 lowercase, 3 numeric values in your password and a minimum of 7 characters.")
            }
        } else {
            setCreation(false)
            setLoading(false)
            setError("Please make sure that the chosen passwords are similar.")
        }
    }

    return (
        <div className="signup-creds">
            <h1 className="signup-title heavy big white">Talent<span className="light-dark-green">Flex.</span></h1>
            <div className="main-signup">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <input class="form-control light-heavy white signup-form" value={state.email} name="email" type="email" placeholder="Email" onChange={handleChange} required></input>
                    <input class="form-control light-heavy white signup-form" value={state.name} name="name" type="text" placeholder="Name" onChange={handleChange} required></input>
                    <input class="form-control light-heavy white signup-form" value={state.username} name="username" type="text" placeholder="Username" onChange={handleChange} required></input>
                    <input class="form-control light-heavy white signup-form" value={state.password} name="password" type="password" placeholder="Password" onChange={handleChange} required></input>
                    <input class="form-control light-heavy white signup-form" value={state.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required></input>
                    {error ? <p className={"diff-pass fade-in-error light-heavy dark-red small"}>{error}</p> : null }
                    {creation ? 
                        <div className="diff-pass fade-in-error light-heavy white small" style={{display: "flex", alignItems: "center"}}>
                            <span style={{marginRight: "5px"}} className="white md-24 material-icons">check_circle_outline</span>
                            <p className="diff-pass fade-in-error light-heavy white small feed-zero-margin">Account created successfully. Proceed to Login.</p>
                        </div> : null}
                    {!loading ? <button type="submit" class="btn btn-success light-heavy green-creds-button">Sign Up</button> :
                    <button class="btn btn-success light-heavy loading-button" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="sr-only"></span>
                    </button> }
                    <p className="have-account light-heavy small white">Already have an account ?</p>
                    <Link to="/login">
                        <button type="button" class="btn btn-light light-heavy white-creds-button">Login</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignupCreds