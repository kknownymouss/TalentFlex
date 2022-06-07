import React, {useRef, useState, useEffect} from "react";
import "../static/css/AuthorProfile.css"
import {Link} from "react-router-dom"
import ProfileSpec from "./ProfileSpec";
import {useMediaQuery} from "react-responsive"

function AuthorProfile(props) {

    const objRef = useRef(null)
    const [neededHeight, setNeededHeight] = useState(0)
    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    useEffect(() => {
        if (objRef.current) {
            isPhone && !isTablet && !isDesktop ? setNeededHeight(`${objRef.current.offsetHeight + 252}px`) : setNeededHeight(`${objRef.current.offsetHeight + 315}px`) // make same one for mobile, no fixed values
        }
    }, [props.attr.author_username])
   

    return (
        <div className="author-profile">
            <div className="author-profile-header">
                <p className="white light-heavy medium feed-zero-margin">About The Author</p>
            </div> 
            <div className="author-creds-banner" style={{backgroundImage: `url(${props.attr.author_profile_banner})`}}>
            </div>
            <div style={{transform: "translateY(-20%)", height: neededHeight}}>
                <div className="author-creds">
                    <img className="author-creds-image" src={props.attr.author_profile_image}></img>
                    <p className="medium white feed-zero-margin">{`u/${props.attr.author_username}`}</p>
                    <p className="small-medium light-gray">{props.attr.author_name}</p>
                    <div ref={objRef} className="author-specs">
                        <ProfileSpec attr={{
                            text: props.attr.author_status
                        }} />
                        <ProfileSpec attr={{
                            text: props.attr.author_top_talent
                        }} />
                        <ProfileSpec attr={{
                            text: props.attr.author_age
                        }} />
                        <ProfileSpec attr={{
                            text: props.attr.author_gender
                        }} />
                    </div>
                </div>
                <div style={{borderTop: "3px solid #beb8b8", paddingTop: "15px"}} className="author-extra-info-wrap">
                    <div className="author-extra-info">
                        <p className="small-medium white light-heavy feed-zero-margin">Posts</p>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <span className="material-icons white md-24" style={{marginRight: "3px"}}>post_add</span>
                            <p className="small-medium light-gray feed-zero-margin">{props.attr.author_number_of_posts}</p>
                        </div>
                    </div>
                    <div className="author-extra-info">
                        <p className="small-medium white light-heavy feed-zero-margin">Hotshots</p>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <span className="material-icons white md-24" style={{marginRight: "3px"}}>whatshot</span>
                            <p className="small-medium light-gray feed-zero-margin">{props.attr.author_number_of_hotshots}</p>
                        </div>
                    </div>
                    
                </div>
                <div style={{marginBottom: "0px", paddingBottom: "15px"}} className="author-extra-info-wrap">
                    <div className="author-extra-info">
                        <p className="small-medium white light-heavy feed-zero-margin">Joined</p>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <span className="material-icons white md-24" style={{marginRight: "3px"}}>today</span>
                            <p className="small-medium light-gray feed-zero-margin">{props.attr.author_date_joined}</p>
                        </div>
                    </div>
                    <div className="author-extra-info">
                        <p className="small-medium white light-heavy feed-zero-margin">Top Talent</p>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <span className="material-icons white md-24" style={{marginRight: "3px"}}>category</span>
                            <p className="small-medium light-gray feed-zero-margin">{props.attr.author_top_talent}</p>
                        </div>
                    </div>  
                </div>
                <Link style={{textDecoration: "none"}} to={`/feed/profile/${props.attr.author_username}`}>
                    <div className="author-extra-buttons">
                        <div className="author-extra-check-button">
                            <p style={{userSelect: "none"}} className="white medium feed-zero-margin">Check Profile</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AuthorProfile