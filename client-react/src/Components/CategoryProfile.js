import React from 'react'
import "../static/css/CategoryProfile.css"
import {Link} from "react-router-dom"
import ProfileSpec from './ProfileSpec'

function CategoryProfile(props) {
    return (
        <div className="author-profile">
            <div className="author-profile-header">
                <p className="white light-heavy medium feed-zero-margin">About The Talent</p>
            </div> 
            <div style={{padding: "15px 30px 5px 30px",margin: "0px", backgroundImage: props.attr.category_bg ? `url(${props.attr.category_bg})` : null, backgroundSize: "cover"}} className="author-creds">
                <img className="author-creds-image" src={props.attr.category_profile_image}></img>
                <p className="medium white">{`t/${props.attr.category_name}`}</p>
                <div className="author-specs">
                    <ProfileSpec attr={{
                        text: props.attr.category_name
                    }} />
                </div>
            </div>
            <div style={{borderTop: "3px solid #beb8b8", borderBottom: "3px solid #beb8b8", paddingTop: "15px", paddingBottom: "15px", marginBottom: "5px"}} className="author-extra-info-wrap">
                <div className="author-extra-info">
                    <p className="small-medium white light-heavy feed-zero-margin">Posts</p>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <span className="material-icons md-24 white" style={{marginRight: "3px"}}>post_add</span>
                        <p className="small-medium light-gray feed-zero-margin">{props.attr.category_number_of_posts}</p>
                    </div>
                </div>
                <div className="author-extra-info">
                    <p className="small-medium white light-heavy feed-zero-margin">Hotshots</p>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <span className="material-icons md-24 white" style={{marginRight: "3px"}}>whatshot</span>
                        <p className="small-medium light-gray feed-zero-margin">{props.attr.category_number_of_hotshots}</p>
                    </div>
                </div>
            </div>
            <p  style={{marginBottom: "5px"}} className="category-info medium white">“ {props.attr.category_info} ”</p>
            <Link style={{textDecoration: "none"}} to={`/feed/${props.attr.category_name}`}>
                <div className="author-extra-buttons">
                    <div className="author-extra-check-button">
                        <p style={{userSelect: "none"}} className="white medium feed-zero-margin">Check Talent</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CategoryProfile