import React, {useEffect, useState} from 'react'
import "../static/css/NotificationPopup.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import {getServerToken, getUserToken} from "./CommonUtls"
import {Link} from "react-router-dom"
import { SERVER_URL } from './CommonUtls'

function NotificationPopup(props) {
    const [loading, setLoading] = useState(false)
    const [notificationState, setNotificationState] = useState([])

    useEffect(() => {
        AOS.init();
        let req_body = {
            user_token: getUserToken(),
            server_token: getServerToken(),
            full: false,
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
                setNotificationState(res.user_received_notifs)
                setLoading(false)
            } else if (res.status === "error 404 not found") {
                
            } else {
                
            }
        }).catch(err => {
            
        })
      }, []);
    return (
        <div data-aos-once="true" data-aos="fade-up" data-aos-duration="500" className="notification-popup-wrap" style={{top: props.attr.top, bottom: props.attr.bottom, left: props.attr.left, right: props.attr.right}}>
            {!loading ? 
                <div> 
                    <div className="notification-div-header">
                        <span className="material-icons md-48 white">notifications</span>
                        <p className="white medium light-heavy feed-zero-margin">Notifications</p>
                        <div className="notification-number">
                            <p className="black heavy feed-zero-margin medium"> {notificationState.length > 99 ? "99" : notificationState.length}</p>
                        </div>
                    </div>
                    {notificationState.length > 0 ? notificationState.slice(0, 3).map(item =>
                        <Link style={{textDecoration: "none"}} to={{pathname: `/feed/${item.category}/${item.post_id}`, action_comment: item.comment_id}}>
                            <div className="notification-row">
                                <img className="profile-image-comment" src={item.user_image} />
                                <p style={{margin: "0px 10px 0px 15px"}} className="white small feed-zero-margin">
                                    <span className="light-heavy">u/{item.sent_username} </span> 
                                    {item.content} 
                                    <span className="light-gray"> {item.date_text}</span>
                                    </p>
                                <img className="notification-post-image" src={item.post_image} />
                            </div>    
                        </Link>   
                    ) : 
                    <div className="notification-empty-card">
                        <img src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582705/TalentFlex_Static/Others/sad_face1_c5ouzk.png"} />
                        <p style={{marginLeft: "8px"}} className="light-gray medium light-heavy feed-zero-margin">No Notifications.</p>
                    </div>
                    }
                    <Link style={{textDecoration: "none"}} to={{pathname: "/feed/notifications"}}>
                        <div className="view-all-notifications">
                            <p className="white small-medium light-heavy feed-zero-margin">View All</p>
                        </div>  
                    </Link>
                </div>
             : 
            <div className="notification-empty-card">
                <span style={{height: "3rem", width: "3rem", color: "#d69d00"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="sr-only"></span>
            </div>}
        </div>
    )
}
export default NotificationPopup