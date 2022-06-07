import React, {useState, useEffect} from 'react'
import {getTheme, getServerToken, getUserToken} from '../CommonUtls'
import FeedNavbar from '../FeedNavbar'
import ChatInterface from './ChatInterface'
import { SERVER_URL } from '../CommonUtls'
import Error404 from "../Error404"


function Chat() {
    const [navbarState, setNavbarState] = useState({})
    const [error404, setError404] = useState("None")

    let req_body = {
        user_token: getUserToken(),
        server_token: getServerToken(),
        category: "Random"
    }    


    useEffect(() => {
        fetch(`${SERVER_URL}/chat_1`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "Online") {
                setNavbarState(prevState => ({
                    ...res,
                    category: "Chat"
                }))
                setError404("None")
            } else if (res.status === "error 404 not found") {
                setError404("Not found")
                setNavbarState({})
            } else {
                setError404("Reset")
                setNavbarState({})
            }
            }).catch(err => {
                setError404("Reset")
                setNavbarState({})
        })
    }, [])

    return (
        <div>
        {error404 !== "None" ? error404 === "Reset" ? <Error404 attr={{resetSession: true}} /> : <Error404 attr={{resetSession: false}} /> : null}
        {Object.keys(navbarState).length > 0 ? 
            <div>
                <FeedNavbar attr={navbarState}/>
                <div className={getTheme()}>
                    <ChatInterface profile_image={navbarState.profile_image} from={navbarState.username}/>
                </div>
            </div> : null
        }
        </div>
    )
}

export default Chat