import React, {useState, useEffect} from 'react'
import "../static/css/ProfilePopup.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProfileSpec from './ProfileSpec';
import {getServerToken, getUserToken} from "./CommonUtls"
import {Link} from "react-router-dom"
import { SERVER_URL } from './CommonUtls'


function ProfilePopup(props) {
    const [loading, setLoading] = useState(false)
    const [popupState, setPopupState] = useState({})

    useEffect(() => {
        AOS.init();
        let req_body = {
            user_token: getUserToken(),
            server_token: getServerToken(),
            user_username: props.attr.username
            
        }
        setLoading(true)
        fetch(`${SERVER_URL}/get_profile_popup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "Online" || res.status === "Offline") {
                setPopupState(res)
                setLoading(false)
            } else if (res.status === "error 404 not found") {
                
            } else {
                
            }
        }).catch(err => {
            
        })
      }, []);
    return (
        <div data-aos="fade-left" data-aos-duration="500" className="profile-popup-wrap" style={{top: props.attr.top, bottom: props.attr.bottom, left: props.attr.left, right: props.attr.right}}>
        {!loading && Object.keys(popupState).length > 0 ? 
            <div>
                <div className="profile-popup">
                    <img className="profile-popup-image" src={props.attr.profile_image}></img>
                    <p className="medium white feed-zero-margin">{`u/${props.attr.username}`}</p>
                    <p className="small-medium light-gray">{popupState.name}</p>
                    <div className="author-specs">
                        <ProfileSpec attr={{
                            text: popupState.status
                        }} />
                        <ProfileSpec attr={{
                            text: popupState.top_talent
                        }} />
                        <ProfileSpec attr={{
                            text: popupState.age
                        }} />
                        <ProfileSpec attr={{
                            text: popupState.gender
                        }} />

                    </div>
                    <p  className="small-medium light-gray feed-zero-margin"><span><img style={{marginBottom: "3px", marginRight: "3px"}} src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582697/TalentFlex_Static/Others/hoshot3_xm2ifo.png"} /></span>{popupState.number_of_hotshots}</p>
                </div>
                <Link style={{textDecoration: "none"}} to={`/feed/profile/${props.attr.username}`}>
                    <div className="author-extra-buttons">
                        <div className="author-extra-check-button">
                            <p style={{userSelect: "none"}} className="white medium feed-zero-margin">Check Profile</p>
                        </div>
                    </div>
                </Link>
            </div> : 
            <div className="profile-popup-loading">
                <span style={{height: "2rem", width: "2rem", color: "#d69d00"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="sr-only"></span>
            </div>
            }
        </div>
    )
}

export default ProfilePopup