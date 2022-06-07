import React, {useState, useEffect} from "react"
import "../static/css/FeedNavbar.css"
import ProfileMore from "./ProfileMore";
import CategoriesDropdown from "./CategoriesDropdown";
import {Link} from 'react-router-dom'
import NotificationPopup from "./NotificationPopup"
import SearchBar from "./SearchBar"


function FeedNavbar(props) {
    const [profileMore, setProfileMore] = useState(false)
    const [categDrop, setCategDrop] = useState(false)
    const [notificationPopup, setNotificationPopup] = useState(false)
    const [searchDropFree, setSearchDropFree] = useState(true)

    const emojiDict = {
        Random: "⁉",
        Gaming: "🎮",
        Editing: "💻",
        Drawing: "✏",
        "Music Production": "🎶",
        Singing: "🎤",
        Soccer: "⚽",
        Design: "💻",
        Dancing: "💃",
        Technology: "👩‍💻",
        Photography: "📸",
        Chat: "✉",
        Settings: "⚙"
    }

    useEffect(() => {
        if (!notificationPopup & !categDrop & !profileMore) {
            setSearchDropFree(true)
        }
    })

    function shutdownPopup() {
        setProfileMore(false);
        setNotificationPopup(false)
        setCategDrop(false)
    }

    function profileMorePop() {
        profileMore ? setProfileMore(false) : setProfileMore(true);
        setNotificationPopup(false)
        setCategDrop(false)
        setSearchDropFree(false)
    }

    function handleNotificationPopup() {
        notificationPopup ? setNotificationPopup(false) : setNotificationPopup(true)
        setProfileMore(false)
        setCategDrop(false)
        setSearchDropFree(false)
    }

    function handleCategClick() {
        categDrop ? setCategDrop(false) : setCategDrop(true)
        setProfileMore(false)
        setNotificationPopup(false)
        setSearchDropFree(false)
    }
    return (
        <div className="feed-navbar">
            <div className="feed-left-start-navbar">
                <h2 style={{marginBottom: "0px"}} className="white light-heavy big">Talent<span className="light-dark-green">Flex.</span></h2>
            </div>
            <div className="feed-right-start-navbar" id="feed-s">          
                <div className="dropdown" onClick={handleCategClick}>
                    <button class="btn btn-secondary categories btn-lg medium dropdown-toggle" type="button">
                        <span style={{marginRight: "10px"}}>{emojiDict[props.attr.category]}</span><span className="lsadoa">{props.attr.category}</span>
                    </button>
                    {categDrop ? <CategoriesDropdown attr={{...props.attr}}/> : null}
                </div>
            </div>
            
            <SearchBar searchDropFree={searchDropFree} shutdownPopup={shutdownPopup}/>
         
            <div className="feed-left-end-navbar">
                <div class="feed-left-end-navbar-half-2">
                    <span  style={{borderRight: "3px solid var(--light-green)",  marginRight: "6px"}} title="Notifications" onClick={handleNotificationPopup} className="feed-navbar-icons material-icons white md-36">
                        notifications
                    </span> 
                    <Link style={{borderRight: "3px solid var(--light-green)", paddingRight: "6px"}} to="/chat">
                        <span title="Chat" className="feed-navbar-icons material-icons white md-36">question_answer</span>
                    </Link>
                    <Link to="/upload">
                        <span title="Upload" class="material-icons white md-36 feed-navbar-icons">add_circle_outline</span> 
                    </Link>
                    {notificationPopup ? 
                        <NotificationPopup attr={{
                            top: "150%",
                            bottom: "",
                            left: "-120%",
                            right: "",
                        }} />
                        : null
                    }
                </div>
            </div>
            <div className="feed-right-end-navbar">
                <div className="feed-profile"  onClick={profileMorePop}>
                    <img className="profile-image" src={props.attr.profile_image} /> 
                    <div className="profile-creds">
                        <h3 className="white light-heavy small profile-cred-item">{props.attr.name}</h3>
                    </div>
                </div>
                { profileMore ? 
                    <ProfileMore attr={{...props.attr}} />   
                : null}
            </div>
        </div>
    )
}

export default FeedNavbar