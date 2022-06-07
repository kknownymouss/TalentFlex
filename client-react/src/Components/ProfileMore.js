import React, {useEffect, useState} from 'react'
import "../static/css/ProfileMore.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProfileOption from "./ProfileOption";
import ProfileSpec from "./ProfileSpec";
import {Link} from 'react-router-dom'
import {useMediaQuery} from "react-responsive"

function ProfileMore(props) {

    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div className="profile-more-info" data-aos="fade-up" data-aos-duration="500" data-aos-once="true">
            <div className="profile-more-info-wrap-1">
                <img className="profile-more-image" src={props.attr.profile_image} /> 
                <p className="white medium light-heavy feed-zero-margin">{props.attr.name}</p>
                <p className="small light-heavy light-gray">{props.attr.username}</p>
                
            </div>
            <div className="profile-more-specs" style={{display : isPhone && !isTablet && !isDesktop ? "none" : "flex"}}>
                <ProfileSpec attr={{
                    text: props.attr.status
                }} />
                <ProfileSpec attr={{
                    text: props.attr.top_talent
                }} /> 
                <ProfileSpec attr={{
                    text: props.attr.age
                }} />
                <ProfileSpec attr={{
                    text: props.attr.gender
                }} /> 
            </div>
            <div className="profile-more-options">
                <Link style={{textDecoration: "none"}} to={`/feed/profile/${props.attr.username}`}>
                    <ProfileOption attr={{img: "account_circle", text: "Profile", func:"check_profile"}} />
                </Link>
                {
                    isPhone && !isTablet && !isDesktop ? 
                    <>
                    <Link style={{textDecoration: "none"}} to={`/feed/notifications`}>
                        <ProfileOption attr={{img: "notifications", text: "Notifications", func:"notifications"}} />
                    </Link>
                    <Link style={{textDecoration: "none"}} to={`/chat`}>
                        <ProfileOption attr={{img: "question_answer", text: "Chat", func:"chat"}} />
                    </Link>
                    <Link style={{textDecoration: "none"}} to={`/upload`}>
                        <ProfileOption attr={{img: "add_circle_outline", text: "Upload", func:"upload"}} />
                    </Link>
                    </>
                    :
                    null
                }
                <Link style={{textDecoration: "none"}} to={`/settings/Profile`}>
                    <ProfileOption attr={{img: "settings", text: "Settings", func:"settings"}} />
                </Link>
                <ProfileOption attr={{img: "dark_mode", text: "", func:"dark_mode"}} />
                <ProfileOption attr={{img: "power_settings_new", text: "Log Out", func:"logout"}} />       
            </div>
        </div> 
    )
}

export default ProfileMore