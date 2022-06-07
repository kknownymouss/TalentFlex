import React, {useEffect, useState} from 'react'
import "../static/css/NotificationPage.css"
import {getUserToken, getServerToken, getTheme} from "./CommonUtls"
import Error404 from "./Error404"
import FeedNavbar from "./FeedNavbar"
import NotificationPageBody from './NotificationPageBody'
import { SERVER_URL } from './CommonUtls'

function NotificationPage() {
    const [navbarState, setNavbarState] = useState({})
    const [error404, setError404] = useState("None")

    let req_body = {
        user_token: getUserToken(),
        server_token: getServerToken(),
        category: "Random"
    }

    useEffect(() => {
        fetch(`${SERVER_URL}/feed_notifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "Online") {
                setNavbarState(prevState => ({
                    ...res,
                    category: "Random"
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
                    <NotificationPageBody />
                </div>
            </div> : null
        }
        </div>
    )
}

export default NotificationPage