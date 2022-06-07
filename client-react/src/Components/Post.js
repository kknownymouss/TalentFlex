import React, {useState, useEffect} from 'react'
import "../static/css/Post.css"
import { Link } from 'react-router-dom'
import {getServerToken, getUserToken} from "./CommonUtls"
import ProfilePopup from './ProfilePopup'
import { SERVER_URL } from './CommonUtls'
import {useMediaQuery} from "react-responsive"


function Post(props) {
    const [hotshot, setHotshot] = useState(props.attr.liked_by_user)
    const [profilePopup, setProfilePopup] = useState({
        active: false,
        key: ""
    })

    const isPhone = useMediaQuery({ query: '(min-width: 315px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

    function handleProfilePopup(index) {
        setProfilePopup(prevState => ({
            active: !prevState.active,
            key: index
        }))
    }

    let req_body = {
        user_token: getUserToken(),
        server_token: getServerToken(),
        post_id: props.attr.post_id
    }
    useEffect(() => {
        setHotshot(props.attr.liked_by_user)
    }, [props])



    function checkHotshot() {
        hotshot ? req_body["modify"] = "decrease" : req_body["modify"] = "increase" 
        fetch(`${SERVER_URL}/modify_hotshot`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req_body)
        }).then(response => response.json()).then(res => {
            if (res.status === "increased") {
                props.reFetchData()
                setHotshot(true)
            } else if (res.status === "decreased") {
                props.reFetchData()
                setHotshot(false)
            } else if (res.status === "error 404 not found") {

            } else {

            }
        }).catch(err => {

        })
    }
    return (
        <div className="post">
            <div className="post-user-creds">
                <img style={{marginRight: "5px"}} src={"https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582689/TalentFlex_Static/Others/category_xdnezl.png"} />
                <p className="small light-heavy white feed-zero-margin">t/{props.attr.category}</p>
                <p style={{marginLeft: "5px", marginRight: "5px"}} className="small light-heavy white feed-zero-margin">∙</p>
                <p className="small light-heavy light-gray feed-zero-margin">Posted by u/
                    <span style={{position: "relative"}} onClick={() => handleProfilePopup("main")} className="small light-heavy light-gray feed-zero-margin username-underline">
                        {props.attr.username} 
                        {profilePopup.active && profilePopup.key === "main" ?
                                <ProfilePopup attr={{
                                    username: props.attr.username, 
                                    profile_image: props.attr.profile_image,
                                    top: "",
                                    bottom: "",
                                    left: "",
                                    right: isPhone && !isTablet && !isDesktop ? "-50px" : "",
                                }} /> : null
                            }
                    </span> on {props.attr.timePosted}.</p>
            </div>
            <p className="medium white light-heavy">{props.attr.caption}</p>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                {props.attr.type == "image" ? <img className="feed-image" src={props.attr.image} /> : <video className='feed-image' src={props.attr.image} controls muted autoPlay></video>}
            </div>
            <div className="feed-interactions">
                <div className="feed-interactions-wrap">
                    <span onClick={checkHotshot} className={hotshot ? "material-icons md-48 white feed-interactions-hot-hotshot" : "material-icons md-48 white feed-interactions-hot"}>whatshot</span>
                    <p className="feed-zero-margin white light medium-big">{props.attr.number_of_likes}</p>
                </div>
                <Link style={{textDecoration: "none"}} to={`/feed/${props.attr.category}/${props.attr.post_id}`}>
                    <div className="feed-interactions-wrap">
                        <span className="material-icons md-48 white feed-interactions-comments">comment</span>
                        <p className="feed-zero-margin white light medium-big">{props.attr.number_of_comments}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Post