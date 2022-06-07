import React, {useState, useEffect} from "react";
import "../static/css/NotificationPageBody.css"
import {getServerToken, getUserToken} from "./CommonUtls"
import {Link} from "react-router-dom"
import { SERVER_URL } from './CommonUtls'

function NotificationPageBody(props) {
    const [notificationState, setNotificationState] = useState([])
    const [loading, setLoading] = useState(false)

    function handleClear() {
        let req_body = {
            user_token: getUserToken(),
            server_token: getServerToken(),
        }

        fetch(`${SERVER_URL}/clear_notifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "Online" || res.status === "Offline") {
                fetchData()
            } else if (res.status === "error 404 not found") {
                
            } else {
                
            }
        }).catch(err => {
        })
    }

    function fetchData() {
        let req_body = {
            user_token: getUserToken(),
            server_token: getServerToken(),
            full: true,
        }
        setLoading(true)
        fetch(`${SERVER_URL}/get_notifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "Online" || res.status === "Offline") {
                setLoading(false)
                setNotificationState(res.user_received_notifs)
            } else if (res.status === "error 404 not found") {
                
            } else {
                
            }
        }).catch(err => {
            
        })
    }

    useEffect(() => {
        fetchData()
      }, []);
    return (
        <div className="notification-body-wrap">
            <div className="notification-body">
            {!loading ?
            <div>
                <div className="notification-body-header">
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                        <span className="material-icons md-48 white">notifications</span>
                        <p className="white medium light-heavy feed-zero-margin">Notifications</p>
                        <div className="notification-number">
                            <p className="black heavy feed-zero-margin medium"> {notificationState.length > 99 ? "99" : notificationState.length}</p>
                        </div>
                    </div>
                    <button disabled={notificationState.length > 0 ? false : true} onClick={handleClear} type="submit" class="btn light-heavy clear-all-button">
                            <span className="material-icons md-24 white">delete</span>
                            <p className="small white light-heavy feed-zero-margin">Clear All</p>
                    </button>
                </div>
                {notificationState.length > 0 ? notificationState.map(item =>
                    <Link style={{textDecoration: "none"}} to={{pathname: `/feed/${item.category}/${item.post_id}`, action_comment: item.comment_id}}>
                        <div className="notification-row">
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <img className="profile-image-comment" src={item.user_image} />
                                <p style={{margin: "0px 10px 0px 15px"}} className="white small-medium feed-zero-margin">
                                    <span className="light-heavy">u/{item.sent_username} </span> 
                                    {item.content} 
                                    <span className="light-gray"> {item.date_text}</span>
                                </p>
                            </div>
                            <img className="notification-post-image" src={item.post_image} />
                        </div>    
                    </Link>
                ) : 
                <div className="notification-body-empty-card">
                    <img src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582705/TalentFlex_Static/Others/sad_face1_c5ouzk.png"} />
                    <p style={{marginLeft: "8px"}} className="light-gray medium light-heavy feed-zero-margin">No Notifications.</p>
                </div>
                }
                </div> : 
                <div className="notification-body-empty-card">
                    <span style={{height: "3rem", width: "3rem", color: "#d69d00"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                </div>
                }
            </div>
        </div>
    )
}

export default NotificationPageBody